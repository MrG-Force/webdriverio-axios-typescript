import ContactDetails from './contact.details.ts'
import DeliveryDetails from './delivery.details.ts'
import PaymentDetails from './payment.details.ts'

export default class CustomerDetails {
  private readonly contactDetails: ContactDetails
  private readonly deliveryDetails: DeliveryDetails
  private readonly paymentDetails: PaymentDetails

  constructor (
    isDeliverySameAsContact = true,
    contactDetails = new ContactDetails(),
    deliveryDetails = new DeliveryDetails(isDeliverySameAsContact),
    paymentDetails = new PaymentDetails()
  ){
    this.contactDetails = contactDetails
    this.deliveryDetails = deliveryDetails
    this.paymentDetails = paymentDetails
  }

  get firstName (): string {
    return this.contactDetails.firstName
  }

  get lastName (): string {
    return this.contactDetails.lastName
  }

  get email (): string {
    return this.contactDetails.email
  }

  get phoneNumber (): string {
    return this.contactDetails.phoneNumber
  }

  get addressLine1 (): string {
    return this.contactDetails.address.addressLine1
  }

  get addressLine2 (): string {
    return this.contactDetails.address.addressLine2
  }

  get suburb (): string {
    return this.contactDetails.address.suburb
  }

  get state (): string {
    return this.contactDetails.address.state
  }

  get postcode (): string {
    return this.contactDetails.address.postcode
  }

  get isDeliverySameAsContact (): boolean {
    return this.deliveryDetails.isDeliverySameAsContact
  }

  get deliveryAddressLine1 (): string | null {
    return this.deliveryDetails.address?.addressLine1 ?? null
  }

  get deliveryAddressLine2 (): string | null {
    return this.deliveryDetails.address?.addressLine2 ?? null
  }

  get deliverySuburb (): string | null {
    return this.deliveryDetails.address?.suburb ?? null
  }

  get deliveryState (): string | null {
    return this.deliveryDetails.address?.state ?? null
  }

  get deliveryPostcode (): string | null {
    return this.deliveryDetails.address?.postcode ?? null
  }

  get contactName (): string {
    return `${this.firstName} ${this.lastName}`
  }

  get deliveryName (): string {
    if (this.isDeliverySameAsContact) {
      return this.contactName
    }
    return this.deliveryDetails.name ?? ''
  }

  get contactFullAddress (): string {
    return `${this.addressLine1} ${this.addressLine2 !== null && this.addressLine2 !== '' ? this.addressLine2 + ' ' : ''}${this.suburb} ${this.state} ${this.postcode}`
  }

  get deliveryFullAddress (): string {
    if (this.isDeliverySameAsContact) {
      return this.contactFullAddress
    }
    return `${this.deliveryAddressLine1} ${this.deliveryAddressLine2 !== null && this.deliveryAddressLine2 !== '' ? this.deliveryAddressLine2 + ' ' : ''}${this.deliverySuburb} ${this.deliveryState} ${this.deliveryPostcode}`
  }

  get cardNumber (): string {
    return this.paymentDetails.cardNumber
  }

  get cardType (): string {
    return this.paymentDetails.cardType
  }

  get nameOnCard (): string {
    return this.paymentDetails.nameOnCard
  }

  get expiryDate (): string {
    return this.paymentDetails.expiryDate
  }

  get cvv (): string {
    return this.paymentDetails.cvv
  }
}
