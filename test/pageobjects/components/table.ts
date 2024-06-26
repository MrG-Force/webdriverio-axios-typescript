export default class Table {
  private readonly tableElement: WebdriverIO.Element

  constructor (tableElement: WebdriverIO.Element) {
    this.tableElement = tableElement
  }

  private async getHeaders (): Promise<string[]> {
    const headerElements = await this.tableElement.$$('thead th')
    return await Promise.all(await headerElements.map(async (header) => await header.getText()))
  }

  private async getColumnIndex (columnName: string): Promise<number> {
    const index = (await this.getHeaders()).indexOf(columnName)
    if (index === -1) {
      throw new Error(`Column "${columnName}" not found`)
    }
    return index
  }

  public async getRowByCellText (text: string): Promise<WebdriverIO.Element> {
    const xpath = `.//tr[td[normalize-space(text()) = '${text}']]`
    const row = await this.tableElement.$(xpath)

    if (!(await row.isExisting())) {
      throw new Error(`Row with text "${text}" not found`)
    }

    return row
  }

  public async getCell (itemIdentifier: string, columnName: string): Promise<WebdriverIO.Element> {
    const row = await this.getRowByCellText(itemIdentifier)
    const columnIndex = await this.getColumnIndex(columnName)
    const cell = await row.$(`td:nth-child(${columnIndex + 1})`)
    return cell
  }
}
