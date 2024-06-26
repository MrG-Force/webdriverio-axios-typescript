export default class PaymentDetails {
  public cardNumber: string
  public cardType: string
  public nameOnCard: string
  public expiryDate: string
  public cvv: string

  constructor (
    cardNumber = '4111111111111111',
    cardType = 'VISA',
    nameOnCard = 'Jane Foobar',
    expiryDate = '12/23',
    cvv = '123'
  ) {
    this.cardNumber = cardNumber
    this.cardType = cardType
    this.nameOnCard = nameOnCard
    this.expiryDate = expiryDate
    this.cvv = cvv
  }
}
