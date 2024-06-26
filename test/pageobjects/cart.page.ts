import Page from './page.ts'
import { open, CheckoutPage } from './index.ts'
import Table from './components/table.ts'

export default class CartPage extends Page {
  async init (): Promise<this> {
    return this
  }

  private get checkoutButton (): Promise<WebdriverIO.Element> {
    return $('a.btn-checkout')
  }

  public async clickCheckoutButton (): Promise<CheckoutPage> {
    await (await this.checkoutButton).click()
    return await open(CheckoutPage)
  }

  private async getCartTable (): Promise<Table> {
    const cartTable = await $('table')
    return new Table(cartTable)
  }

  public async getCartItemsCount (): Promise<number> {
    return parseInt((await (await $('.cart-count')).getText()).trim())
  }

  public async getItemPrice (itemName: string): Promise<number> {
    const table = await this.getCartTable()
    const priceCell = await table.getCell(itemName, 'Price')
    return parseFloat((await priceCell.getText()).trim().replace('$', '').replace(/,/g, ''))
  }
}
