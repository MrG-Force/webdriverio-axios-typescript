import Select from './select.ts'

export default abstract class Tab {
  tabName: string
  rootElement: WebdriverIO.Element
  abstract init (): Promise<this>

  constructor (tabName: string, rootElement: WebdriverIO.Element) {
    this.tabName = tabName
    this.rootElement = rootElement
  }

  protected async getTextInputByFormControlName (name: string): Promise<WebdriverIO.Element> {
    return await this.rootElement.$(`input[formcontrolname="${name}"]`)
  }

  protected async setTextInput (formcontrolname: string, text: string | null): Promise<this> {
    if (text === null) {
      return this
    }
    await this.getTextInputByFormControlName(formcontrolname).then(async input => { await input.setValue(text) })
    return this
  }

  protected async getSelectInputByFormControlName (name: string): Promise<WebdriverIO.Element> {
    return await this.rootElement.$(`mat-select[formcontrolname="${name}"]`)
  }

  protected async setSelectInput (formcontrolname: string, visibleText: string | null): Promise<this> {
    if (visibleText === null) {
      return this
    }
    const selectElement = await this.getSelectInputByFormControlName(formcontrolname)
    const selectInput = new Select(selectElement, formcontrolname)
    await selectInput.selectByVisibleText(visibleText)

    return this
  }

  public async clickNextButton (nextTab: string): Promise<this> {
    const nextButton = await this.rootElement.$('button=Next')
    await browser.waitUntil(async () => {
      await nextButton.click()
      const activeHeader = await $('mat-step-header[aria-selected="true"]')
      const activeTabName = (await (await activeHeader.$('div.mat-step-text-label')).getText()).trim().replaceAll('"', '')
      return activeTabName === nextTab
    })
    return this
  }
}
