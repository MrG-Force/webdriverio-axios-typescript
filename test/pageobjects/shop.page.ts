import Page from './page.ts'

export default class ShopPage extends Page {
  async init (): Promise<this> {
    await browser.waitUntil(async () => await (await $('.product')).isDisplayed())
    return this
  }

  public async buyProductByName (productName: string, quantity: number): Promise<this> {
    const product = await this.getProductCardByName(productName)
    for (let i = 0; i < quantity; i++) {
      await product.$('a=Buy').click()
    }
    return this
  }

  public async getProductPrice (productName: string): Promise<number> {
    const product = await this.getProductCardByName(productName)
    const price = (await product.$('.product-price').getText()).trim().replace('$', '').replace(/,/g, '')
    return parseFloat(price)
  }

  private async getProductCardByName (productName: string): Promise<WebdriverIO.Element> {
    return await $(`//li[.//div[h4[text()='${productName}']]]`)
  }
}
