export default class Address {
  public addressLine1: string
  public addressLine2: string
  public suburb: string
  public state: string
  public postcode: string

  constructor (
    addressLine1 = '123 Type St',
    addressLine2 = 'Unit 3',
    suburb = 'Interfaceland',
    state = 'VIC',
    postcode = '3000'
  ) {
    this.addressLine1 = addressLine1
    this.addressLine2 = addressLine2
    this.suburb = suburb
    this.state = state
    this.postcode = postcode
  }
}
