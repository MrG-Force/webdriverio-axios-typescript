import { type CustomerDetails } from '../../../data'
import Tab from '../../components/tab.ts'

export default class PaymentTab extends Tab {
  async init (): Promise<this> {
    throw new Error('Method not implemented.')
  }

  async fillOutPaymentDetails (creditCard: CustomerDetails): Promise<void> {
    await this.setCardNumber(creditCard.cardNumber)
    await this.selectCardType(creditCard.cardType)
    await this.setNameOnCard(creditCard.nameOnCard)
    await this.setExpiryDate(creditCard.expiryDate)
    await this.setCVV(creditCard.cvv)
  }

  public async setCardNumber (cardNumber: string): Promise<this> {
    await this.setTextInput('creditcardno', cardNumber)
    return this
  }

  public async selectCardType (cardType: string): Promise<this> {
    await this.setSelectInput('creditcardtype', cardType)
    return this
  }

  public async setNameOnCard (nameOnCard: string): Promise<this> {
    await this.setTextInput('creditcardname', nameOnCard)
    return this
  }

  public async setExpiryDate (expiryDate: string): Promise<this> {
    await this.setTextInput('creditcardexpiry', expiryDate)
    return this
  }

  public async setCVV (cvv: string): Promise<this> {
    await this.setTextInput('creditcardcvv', cvv)
    return this
  }
}
