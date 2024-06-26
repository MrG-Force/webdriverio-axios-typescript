import { open, ShopPage, CartPage } from './index.ts'

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default abstract class Page {
  abstract init (): Promise<this>

  public get brand (): Promise<string> {
    return $('span.brand').getText()
  }

  private get shopLink (): Promise<WebdriverIO.Element> {
    return $('button[ng-reflect-router-link="/toy-list"')
  }

  private get cartLink (): Promise<WebdriverIO.Element> {
    return $('button[ng-reflect-router-link="/cart"')
  }

  public async clickShopLink (): Promise<ShopPage> {
    await (await this.shopLink).click()
    return await open(ShopPage)
  }

  public async clickCartLink (): Promise<CartPage> {
    await (await this.cartLink).click()
    return await open(CartPage)
  }
}
