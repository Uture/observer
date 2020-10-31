export default class Visit {

  constructor(
    public id: string, 
    public imported_id: string,
    public startDate: Date, 
    public endDate: Date,
    public petId: number,
    public confirmed: boolean) {
  }

}