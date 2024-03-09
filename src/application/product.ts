import { v4 as uuidv4 } from 'uuid'

type ProductConstructor = {
  name: string
  price: number
}

interface ProductInterface {
  isValid(): boolean | never;
  enable(): void | never;
  disable(): void | never

  getId(): string
  getName(): string
  getStatus(): string
  getPrice(): number
}

const Status = {
  DISABLED: 'disabled',
  ENABLED: 'enabled'
}

export class Product implements ProductInterface {
  id: string
  name: string
  price: number
  status: string = ''

  constructor({ name, price }: ProductConstructor) {
    this.id = uuidv4()
    this.name = name
    this.price = price
  }

  isValid(): boolean {
    throw new Error("Method not implemented.");
  }

  enable(): void | never {
    if (this.price <= 0) {
      throw new Error('the price must be greater than zero to enable the product')
    }

    this.status = Status.ENABLED
  }

  disable(): void {
    throw new Error("Method not implemented.");
  }
  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name
  }
  getStatus(): string {
    return this.status
  }
  getPrice(): number {
    return this.price
  }

}
