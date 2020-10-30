export default class Visit {

  constructor(
    public id: string, 
    public imported_id: string,
    public startDate: string|Date, 
    public endDate: string|Date,
    public petId: number,
    public confirmed: boolean) {
  }

}