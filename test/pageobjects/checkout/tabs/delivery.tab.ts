import { type CustomerDetails } from '../../../data'
import Tab from '../../components/tab.ts'

export default class DeliveryTab extends Tab {
  async init (): Promise<this> {
    throw new Error('Method not implemented.')
  }

  async fillOutDeliveryDetails (delivery: CustomerDetails): Promise<void> {
    await this.clickSameAsContactAddressOption(delivery.isDeliverySameAsContact)
    if (delivery.isDeliverySameAsContact) {
      return
    }
    await this.setName(delivery.deliveryName)
    await this.setAddressLine1(delivery.deliveryAddressLine1)
    await this.setAddressLine2(delivery.deliveryAddressLine2)
    await this.setSuburb(delivery.deliverySuburb)
    await this.selectState(delivery.deliveryState)
    await this.setPostcode(delivery.deliveryPostcode)
  }

  public async clickSameAsContactAddressOption (isDeliverySameAsContact: boolean): Promise<this> {
    const value = isDeliverySameAsContact ? 'Yes' : 'No'
    const radioBtn = await this.rootElement.$(`mat-radio-button[value='${value}'] > label`)
    const radioBtnWrapper = await this.rootElement.$(`mat-radio-button[value='${value}']`)

    await browser.waitUntil(async () => {
      await radioBtn.click()
      return (await radioBtnWrapper.getAttribute('class')).includes('mat-radio-checked')
    })

    return this
  }

  public async setName (name: string): Promise<this> {
    await this.setTextInput('name', name)
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
