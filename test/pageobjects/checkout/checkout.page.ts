import Page from '../page.ts'
import { ContactTab, DeliveryTab, PaymentTab, ConfirmationTab } from './tabs/index.ts'

export default class CheckoutPage extends Page {
  async init (): Promise<this> {
    await browser.waitUntil(async () => (await this.getActiveTabName()) === 'Contact Details')
    return this
  }

  private get activeTab (): Promise<WebdriverIO.Element> {
    return $('div[role="tabpanel"][aria-expanded="true"]')
  }

  private get activeTabHeader (): Promise<WebdriverIO.Element> {
    return $('mat-step-header[aria-selected="true"]')
  }

  public async getActiveTabName (): Promise<string> {
    return (await (await (await this.activeTabHeader).$('div.mat-step-text-label')).getText()).trim().replaceAll('"', '')
  }

  public async getContactDetailsTab (): Promise<ContactTab> {
    return new ContactTab('Contact Details', await this.activeTab)
  }

  public async getDeliveryDetailsTab (): Promise<DeliveryTab> {
    return new DeliveryTab('Delivery Details', await this.activeTab)
  }

  public async getPaymentDetailsTab (): Promise<PaymentTab> {
    return new PaymentTab('Payment Details', await this.activeTab)
  }

  public async getConfirmOrderTab (): Promise<ConfirmationTab> {
    return new ConfirmationTab('Confirm Order', await this.activeTab)
  }
}
