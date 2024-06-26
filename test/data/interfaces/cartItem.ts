import type Toy from './toy'

export default interface CartItem {
  toy: Toy
  quantity: number
}
