import { v4 as uuidv4 } from 'uuid'

import { Equals, IsIn, IsNumber, IsString, IsUUID, isUUID, validate } from 'class-validator'

type ProductConstructor = {
  id?: string
  name: string
  price: number
  status?: string
}

interface ProductInterface {
  isValid(): Promise<boolean | never>;
  enable(): void | never;
  disable(): void | never

  getId(): string
  getName(): string
  getStatus(): string
  getPrice(): number
}

export const StatusProduct = {
  DISABLED: 'disabled',
  ENABLED: 'enabled'
} as const

export class Product implements ProductInterface {
  @IsUUID()
  id: string

  @IsString()
  name: string

  @IsNumber()
  price: number

  @IsIn([StatusProduct.ENABLED, StatusProduct.DISABLED])
  status: string = ''

  constructor({ id, name, status, price }: ProductConstructor) {
    this.id = id ?? uuidv4()
    this.name = name
    this.price = price
    this.status = status ?? ''
  }

  async isValid(): Promise<boolean | never> {
    if (this.status == '') {
      this.status = StatusProduct.DISABLED
    }

    if (this.status !== StatusProduct.ENABLED && this.status !== StatusProduct.DISABLED) {
      throw new Error('the status must be enabled or disabled')
    }


    console.log(this.price, this.price < 0)
    if (this.price < 0) {
      throw new Error('the price must be greater or equal zero')
    }

    const errors = await validate(this)

    if (errors.length) {
      throw new Error('Product has errors validate')
    }

    return true
  }

  enable(): void | never {
    if (this.price > 0) {
      this.status = StatusProduct.ENABLED
      return
    }

    throw new Error('the price must be greater than zero to enable the product')
  }

  disable(): void | never {
    if (this.price === 0) {
      this.status = StatusProduct.DISABLED
      return
    }

    throw new Error('the price must be zero in order to have the product disabled')
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
