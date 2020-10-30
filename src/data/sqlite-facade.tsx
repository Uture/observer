import { openDatabase, ResultSet, WebSQLDatabase } from 'expo-sqlite'

const CREATE_PET_TABLE_STMT = `create table if not exists pet (
  id INTEGER PRIMARY KEY NOT NULL, 
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  address TEXT,
  phone_number TEXT,
  emergency_name TEXT,
  emergency_address TEXT,
  emergency_phone_number TEXT)
`

const CREATE_VISIT_TABLE_STMT = `create table if not exists visit (
  id INTEGER PRIMARY KEY NOT NULL, 
  imported_id STRING NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  confirmed INTEGER DEFAULT 0,
  pet_id INTEGER NOT NULL,
  FOREIGN KEY (pet_id) REFERENCES pet (id))
`

const SELECT_VISITS_FOR_PERIOD_STMT = `select * from visit where startDate >= ?  and endDate <= ?`
const SELECT_ALL_PETS = `select * from pet`

const feedDummyPets = (db: WebSQLDatabase, callback: Function) => {
  db.transaction(tx => {
    tx.executeSql(
      "insert into pet (name, owner_name, address, phone_number) values (?, ?, ?, ?)",
    ['Max', 'Luba', 'Henryka 205/19a', '+43/6624148927']
    )
    tx.executeSql(
      "insert into pet (name, owner_name, address, phone_number) values (?, ?, ?, ?)",
    ['Zeus', 'Manuel', 'Hohe Straße 42', '+48/6062243972']
    )
  },
  (err) => console.log(err),
  () => callback())
}

const clearTables = (db: WebSQLDatabase) => {
  db.transaction(tx => {
    tx.executeSql("delete from pet")
    tx.executeSql("delete from visit")
  })
}

class LocalSQLiteFacade {

  db: WebSQLDatabase

  constructor() {
    this.db = openDatabase('local-db')
  }

  initializeDB(successCallback: Function) {
    this.db.transaction(tx => {
      tx.executeSql(CREATE_PET_TABLE_STMT)
      tx.executeSql(CREATE_VISIT_TABLE_STMT)
      },
      (err) => console.log(err),
      () => successCallback()
    )
  }

  createDummyData(successCallback: Function) {
    clearTables(this.db)
    feedDummyPets(this.db, successCallback)
  }

  selectVisitsForPeriod(startDate: Date, endDate: Date, successCallback: Function) {
    this.db.transaction(tx => {
      tx.executeSql(
        SELECT_VISITS_FOR_PERIOD_STMT, 
        [startDate, endDate],
        (_, results) => {
          const rows: any = results.rows
          successCallback(rows)
        })
    })
  }

  selectAllPets(successCallback?: Function) {
    this.db.transaction(tx => {
      tx.executeSql(
        SELECT_ALL_PETS,
        [],
        (_, results) => {
          const rows: any = results.rows
          if(successCallback && rows && rows._array) {
            successCallback(rows._array)
          }
        }
      )
    })
  }

}

const db = new LocalSQLiteFacade()

export default db