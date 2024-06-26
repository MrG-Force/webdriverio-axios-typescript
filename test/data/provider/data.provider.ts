import { readFile } from 'fs/promises'
import * as path from 'path'

export default abstract class DataProvider<T> {
  protected dataFile: string

  protected async getJsonData (): Promise<any> {
    const filePath = path.join(process.cwd(), this.dataFile)
    const value = await readFile(filePath, { encoding: 'utf-8' })
    return JSON.parse(value)
  }

  constructor (dataFile: string) {
    this.dataFile = dataFile
  }

  public abstract getData (): Promise<T>
}
