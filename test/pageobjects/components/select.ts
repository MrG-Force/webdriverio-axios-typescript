export default class Select {
  rootElement: WebdriverIO.Element
  formControlName: string

  constructor (rootElement: WebdriverIO.Element, formControlName: string) {
    this.formControlName = formControlName
    this.rootElement = rootElement
  }

  public async selectByVisibleText (visibleText: string): Promise<void> {
    await this.rootElement.click()
    // wait for the selectInput element to have attribute aria-expanded set to true
    await browser.waitUntil(
      async () => (await this.rootElement.getAttribute('aria-expanded')) === 'true',
      {
        timeout: 500, // Specifies the timeout in milliseconds. Adjust as needed.
        timeoutMsg: `selectInput with formcontrolname="${this.formControlName}" did not expand within the expected time`
      }
    )
    await (await $(`mat-option[value="${visibleText}"]`)).click()
  }
}
