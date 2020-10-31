import moment from 'moment'

export default class ExternalVisit {

  constructor(
    public id: string,
    public title: string,
    public startDate: moment.Moment, 
    public endDate: moment.Moment) {
  }

}