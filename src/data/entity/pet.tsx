export default class Pet {
  
  constructor(
    public id: number, 
    public name: string,
    public owner_name: string,
    public phone_number?: string,
    public address?: string,
    public emergency_name?: string,
    public emergency_phone_number?: string,
    public emergency_address?: string) {
  }

}