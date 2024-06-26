import Table from '../../components/table.ts'

export default class ConfirmationTab {
  tabName: string
  rootElement: WebdriverIO.Element

  constructor (tabName: string, rootElement: WebdriverIO.Element) {
    this.tabName = tabName
    this.rootElement = rootElement
  }

  private async getDetailsPanel (panelName: string): Promise<WebdriverIO.Element> {
    const panel = await $(`//mat-expansion-panel[.//mat-panel-title[normalize-space(text())='${panelName}']]`)
    const panelHeader = await panel.$('mat-expansion-panel-header')
    if (await panelHeader.getAttribute('aria-expanded') === 'false') {
      await (await panelHeader.$('.mat-expansion-indicator')).click()
      await browser.waitUntil(async () => (await panelHeader.getAttribute('aria-expanded')) === 'true', {
        timeout: 1000,
        timeoutMsg: `Panel "${panelName}" did not expand within the expected time`
      })
      await browser.waitUntil(async () => await (await panel.$('table')).isDisplayed(), { timeout: 1000 })
    }
    return panel
  }

  public async orderContainsItem (itemTitle: string): Promise<boolean> {
    const orderDetailsTable = await (await this.getDetailsPanel('Order Details')).$('table')
    const table = new Table(orderDetailsTable)
    return await table.getRowByCellText(itemTitle).then(() => true).catch(() => false)
  }

  public async getItemQuantity (itemTitle: string): Promise<number> {
    const orderDetailsTable = await (await this.getDetailsPanel('Order Details')).$('table')
    const table = new Table(orderDetailsTable)
    const quantityCell = await table.getCell(itemTitle, 'Quantity')
    return parseInt((await quantityCell.getText()).trim())
  }

  public async getItemPrice (itemTitle: string): Promise<number> {
    const orderDetailsTable = await (await this.getDetailsPanel('Order Details')).$('table')
    const table = new Table(orderDetailsTable)
    const priceCell = await table.getCell(itemTitle, 'Unit price')
    return parseFloat((await priceCell.getText()).trim().replace('$', '').replace(/,/g, ''))
  }

  public async getItemSubtotal (itemTitle: string): Promise<number> {
    const orderDetailsTable = await (await this.getDetailsPanel('Order Details')).$('table')
    const table = new Table(orderDetailsTable)
    const subtotalCell = await table.getCell(itemTitle, 'Sub total')
    return parseFloat((await subtotalCell.getText()).trim().replace('$', '').replace(/,/g, ''))
  }

  public async getDeliveryName (): Promise<string> {
    const table = await (await this.getDetailsPanel('Delivery & Contact Details')).$('table')
    return (await (await table.$('.//tr[2]/td[2]')).getText()).trim()
  }

  public async getDeliveryAddress (): Promise<string> {
    const table = await (await this.getDetailsPanel('Delivery & Contact Details')).$('table')
    return (await (await table.$('.//tr[3]/td[2]')).getText()).trim().replaceAll(',\n', ' ').replaceAll('  ', ' ')
  }

  public async getContactName (): Promise<string> {
    const table = await (await this.getDetailsPanel('Delivery & Contact Details')).$('table')
    return (await (await table.$('.//tr[2]/td[4]')).getText()).trim()
  }

  public async getContactAddress (): Promise<string> {
    const table = await (await this.getDetailsPanel('Delivery & Contact Details')).$('table')
    return (await (await table.$('.//tr[3]/td[4]')).getText()).trim().replaceAll(',\n', ' ').replaceAll('  ', ' ')
  }

  public async getEmail (): Promise<string> {
    const table = await (await this.getDetailsPanel('Delivery & Contact Details')).$('table')
    return (await (await table.$('.//tr[4]/td[3]')).getText()).trim()
  }

  public async getPhoneNumber (): Promise<string> {
    const table = await (await this.getDetailsPanel('Delivery & Contact Details')).$('table')
    return (await (await table.$('.//tr[5]/td[3]')).getText()).trim()
  }

  public async getNameOnCard (): Promise<string> {
    const table = await (await this.getDetailsPanel('Payment Details')).$('table')
    return (await (await table.$('.//tr[1]/td[2]')).getText()).trim()
  }

  public async getCardNumber (): Promise<string> {
    const table = await (await this.getDetailsPanel('Payment Details')).$('table')
    return (await (await table.$('.//tr[2]/td[2]')).getText()).trim()
  }

  public async getCardType (): Promise<string> {
    const table = await (await this.getDetailsPanel('Payment Details')).$('table')
    return (await (await table.$('.//tr[3]/td[2]')).getText()).trim()
  }

  public async getExpiryDate (): Promise<string> {
    const table = await (await this.getDetailsPanel('Payment Details')).$('table')
    return (await (await table.$('.//tr[4]/td[2]')).getText()).trim()
  }

  public async getCVV (): Promise<string> {
    const table = await (await this.getDetailsPanel('Payment Details')).$('table')
    return (await (await table.$('.//tr[5]/td[2]')).getText()).trim()
  }
}
