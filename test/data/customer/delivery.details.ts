import Address from './address.ts'

export default class DeliveryDetails {
  public isDeliverySameAsContact: boolean
  public name: string | null
  public address: Address | null
  constructor (
    isDeliverySameAsContact = true,
    name = null,
    address = null    
  ) {
    this.isDeliverySameAsContact = isDeliverySameAsContact
    if (!isDeliverySameAsContact) {
      this.name = 'Michael Smith'
      this.address = new Address(
        '456 Interface St',
        'Unit 2',
        'Compilersville',
        'NSW',
        '2000'
      )
    } else {
      this.name = name
      this.address = address
    }
  }
}
