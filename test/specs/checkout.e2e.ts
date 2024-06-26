import { expect } from '@wdio/globals'
import { open, HomePage } from '../pageobjects/index.ts'
import { CustomerDetails, ToyProvider } from '../data/index.ts'
import type CartItem from '../data/interfaces/cartItem.ts'

describe('Checkout process test', () => {
  
  it('should complete the checkout process', async () => {
    const customerDetails = new CustomerDetails()

    // Open the home page
    const homePage = await open(HomePage)

    // Go to Shop page and buy a product
    const shopPage = await homePage.clickShopLink()
    await shopPage.buyProductByName('M3GAN', 2)
    const shopPrice = await shopPage.getProductPrice('M3GAN')

    // Go to Cart page
    const cartPage = await shopPage.clickCartLink()
    await expect(await cartPage.getCartItemsCount()).toBe(2)
    const cartPrice = await cartPage.getItemPrice('M3GAN')
    await expect(cartPrice).toBe(shopPrice)

    // Go to Checkout page
    const checkoutPage = await cartPage.clickCheckoutButton()

    // Fill out Contact Details form
    const contactTab = await checkoutPage.getContactDetailsTab()
    await contactTab.fillOutContactDetails(customerDetails)
    await contactTab.clickNextButton('Delivery Details')
    await expect(await checkoutPage.getActiveTabName()).toBe('Delivery Details')

    // Fill out Delivery Details form
    const deliveryTab = await checkoutPage.getDeliveryDetailsTab()
    await deliveryTab.fillOutDeliveryDetails(customerDetails)
    await deliveryTab.clickNextButton('Payment Details')
    await expect(await checkoutPage.getActiveTabName()).toBe('Payment Details')

    // Fill out Payment Details form
    const paymentTab = await checkoutPage.getPaymentDetailsTab()
    await paymentTab.fillOutPaymentDetails(customerDetails)
    await paymentTab.clickNextButton('Confirm Order')
    await expect(await checkoutPage.getActiveTabName()).toBe('Confirm Order')

    const confirmationTab = await checkoutPage.getConfirmOrderTab()

    // Check the order details
    await expect(await confirmationTab.orderContainsItem('M3GAN')).toBe(true)
    await expect(await confirmationTab.getItemQuantity('M3GAN')).toBe(2)
    await expect(await confirmationTab.getItemPrice('M3GAN')).toBe(cartPrice)
    const expectedSubtotal = parseFloat((cartPrice * 2).toFixed(2))
    await expect(await confirmationTab.getItemSubtotal('M3GAN')).toBe(expectedSubtotal)

    // Check the customer details
    await expect(await confirmationTab.getDeliveryName()).toBe(customerDetails.contactName)
    await expect(await confirmationTab.getDeliveryAddress()).toBe(customerDetails.deliveryFullAddress)
    await expect(await confirmationTab.getContactName()).toBe(customerDetails.contactName)
    await expect(await confirmationTab.getContactAddress()).toBe(customerDetails.contactFullAddress)
    await expect(await confirmationTab.getEmail()).toBe(customerDetails.email)
    await expect(await confirmationTab.getPhoneNumber()).toBe(customerDetails.phoneNumber)

    // Check the payment details
    await expect(await confirmationTab.getNameOnCard()).toBe(customerDetails.nameOnCard)
    await expect(await confirmationTab.getCardNumber()).toBe(customerDetails.cardNumber)
    await expect(await confirmationTab.getCardType()).toBe(customerDetails.cardType)
    await expect(await confirmationTab.getExpiryDate()).toBe(customerDetails.expiryDate)
    await expect(await confirmationTab.getCVV()).toBe(customerDetails.cvv)
  })

  it('should buy multiple products', async () => {
    const isDeliverySameAsContact = false
    const customerDetails = new CustomerDetails(isDeliverySameAsContact)
    const toyData = await new ToyProvider('test/data/toy.data.json').getData()
    const cartItems: CartItem[] = []

    // Open the home page
    const homePage = await open(HomePage)

    // Go to Shop page and buy a product
    const shopPage = await homePage.clickShopLink()

    for (const toy of toyData) {
      const quantity = Math.floor(Math.random() * 3) + 1
      await shopPage.buyProductByName(toy.title, quantity)
      const shopPrice = await shopPage.getProductPrice(toy.title)
      await expect(shopPrice).toBe(toy.price)
      cartItems.push({ toy, quantity })
    }

    // Go to Cart page
    const cartPage = await shopPage.clickCartLink()
    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    await expect(await cartPage.getCartItemsCount()).toBe(itemsCount)
    for (const item of cartItems) {
      const cartPrice = await cartPage.getItemPrice(item.toy.title)
      await expect(cartPrice).toBe(item.toy.price)
    }

    // Go to Checkout page
    const checkoutPage = await cartPage.clickCheckoutButton()

    // Fill out Contact Details form
    const contactTab = await checkoutPage.getContactDetailsTab()
    await contactTab.fillOutContactDetails(customerDetails)
    await contactTab.clickNextButton('Delivery Details')
    await expect(await checkoutPage.getActiveTabName()).toBe('Delivery Details')

    // Fill out Delivery Details form
    const deliveryTab = await checkoutPage.getDeliveryDetailsTab()
    await deliveryTab.fillOutDeliveryDetails(customerDetails)
    await deliveryTab.clickNextButton('Payment Details')
    await expect(await checkoutPage.getActiveTabName()).toBe('Payment Details')

    // Fill out Payment Details form
    const paymentTab = await checkoutPage.getPaymentDetailsTab()
    await paymentTab.fillOutPaymentDetails(customerDetails)
    await paymentTab.clickNextButton('Confirm Order')
    await expect(await checkoutPage.getActiveTabName()).toBe('Confirm Order')

    const confirmationTab = await checkoutPage.getConfirmOrderTab()

    // Check the order details
    for (const item of cartItems) {
      await expect(await confirmationTab.orderContainsItem(item.toy.title)).toBe(true)
      await expect(await confirmationTab.getItemQuantity(item.toy.title)).toBe(item.quantity)
      await expect(await confirmationTab.getItemPrice(item.toy.title)).toBe(item.toy.price)
      const expectedSubtotal = parseFloat((item.toy.price * item.quantity).toFixed(2))
      await expect(await confirmationTab.getItemSubtotal(item.toy.title)).toBe(expectedSubtotal)
    }

    // Check the customer details
    await expect(await confirmationTab.getDeliveryName()).toBe(customerDetails.deliveryName)
    await expect(await confirmationTab.getDeliveryAddress()).toBe(customerDetails.deliveryFullAddress)
    await expect(await confirmationTab.getContactName()).toBe(customerDetails.contactName)
    await expect(await confirmationTab.getContactAddress()).toBe(customerDetails.contactFullAddress)
    await expect(await confirmationTab.getEmail()).toBe(customerDetails.email)
    await expect(await confirmationTab.getPhoneNumber()).toBe(customerDetails.phoneNumber)

    // Check the payment details
    await expect(await confirmationTab.getNameOnCard()).toBe(customerDetails.nameOnCard)
    await expect(await confirmationTab.getCardNumber()).toBe(customerDetails.cardNumber)
    await expect(await confirmationTab.getCardType()).toBe(customerDetails.cardType)
    await expect(await confirmationTab.getExpiryDate()).toBe(customerDetails.expiryDate)
    await expect(await confirmationTab.getCVV()).toBe(customerDetails.cvv)
  })
})
