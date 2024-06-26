import Address from './address.ts'

export default class ContactDetails {
  public firstName: string
  public lastName: string
  public email: string
  public phoneNumber: string
  public address: Address

  constructor (
    firstName = 'John',
    lastName = 'Doe',
    email = 'john.doe@testmail.com',
    phoneNumber = '0412345678',
    address = new Address()
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phoneNumber = phoneNumber
    this.address = address
  }
}
