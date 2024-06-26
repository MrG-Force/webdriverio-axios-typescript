import type Toy from '../interfaces/toy.ts'
import DataProvider from './data.provider.ts'

export default class ToyProvider extends DataProvider<Toy[]> {
  public async getData (): Promise<Toy[]> {
    return await this.getJsonData()
  }
}
