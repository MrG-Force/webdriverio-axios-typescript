import { type CustomerDetails } from '../../../data'
import Tab from '../../components/tab.ts'

export default class ContactTab extends Tab {
  async init (): Promise<this> {
    throw new Error('Method not implemented.')
  }

  async fillOutContactDetails (contact: CustomerDetails): Promise<void> {
    await this.setFirstName(contact.firstName)
    await this.setLastName(contact.lastName)
    await this.setEmail(contact.email)
    await this.setPhoneNumber(contact.phoneNumber)
    await this.setAddressLine1(contact.addressLine1)
    await this.setAddressLine2(contact.addressLine2)
    await this.setSuburb(contact.suburb)
    await this.selectState(contact.state)
    await this.setPostcode(contact.postcode)
  }

  public async setFirstName (firstName: string): Promise<this> {
    await this.setTextInput('firstName', firstName)
    return this
  }

  public async setLastName (lastName: string): Promise<this> {
    await this.setTextInput('lastName', lastName)
    return this
  }

  public async setEmail (email: string): Promise<this> {
    await this.setTextInput('email', email)
    return this
  }

  public async setPhoneNumber (phoneNumber: string): Promise<this> {
    await this.setTextInput('phonenumber', phoneNumber)
    return this
  }

  public async setAddressLine1 (addressLine1: string | null): Promise<this> {
    await this.setTextInput('addressline1', addressLine1)
    return this
  }

  public async setAddressLine2 (addressLine2: string | null): Promise<this> {
    await this.setTextInput('addressline2', addressLine2)
    return this
  }

  public async setSuburb (suburb: string | null): Promise<this> {
    await this.setTextInput('suburb', suburb)
    return this
  }

  public async selectState (state: string | null): Promise<this> {
    await this.setSelectInput('state', state)
    return this
  }

  public async setPostcode (postcode: string | null): Promise<this> {
    await this.setTextInput('postcode', postcode)
    return this
  }
}
