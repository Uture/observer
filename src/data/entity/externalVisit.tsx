export default class ExternalVisit {

  constructor(
    public id: string,
    public title: string,
    public startDate: string|Date, 
    public endDate: string|Date) {
  }

}