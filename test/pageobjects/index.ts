/* eslint-disable new-cap */
import type Page from './page.ts'

export async function open<T extends Page> (page: new() => T): Promise<T> {
  return await (new page()).init()
}

export { default as HomePage } from './home.page.ts'
export { default as ShopPage } from './shop.page.ts'
export { default as CartPage } from './cart.page.ts'
export { default as CheckoutPage } from './checkout/checkout.page.ts'
