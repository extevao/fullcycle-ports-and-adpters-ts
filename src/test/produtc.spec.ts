import { Product, StatusProduct } from "../application/product"

describe('product test', () => {

  it('deve habilitar um produto', () => {
    const product = new Product({ name: 'Hello', price: 10, })
    product.enable()

    expect(product.getStatus()).toBe(StatusProduct.ENABLED)
  })

  it('deve lancar um Erro ao habilitar um produto quando preco for 0', () => {
    expect(() => {
      const product = new Product({ name: 'Teste', price: 0 })
      product.enable()
    }).toThrow('the price must be greater than zero to enable the product')
  })

  it('deve desabilitar um produto', () => {
    const product = new Product({ name: 'Hello', price: 0 })
    product.disable()

    expect(product.getStatus()).toBe(StatusProduct.DISABLED)
  })

  it('deve lancar um Erro ao desabilitar um produto quando preco nao for zero', () => {
    expect(() => {
      const product = new Product({ name: 'Teste', price: 12 })
      product.disable()
    }).toThrow('the price must be zero in order to have the product disabled')
  })


  it('deve lancar um Erro ao verificar o produto usando o isValid de um produto invalido', async () => {
    let product = new Product({ id: 'dqwwdjkqopijd', name: 'hello', status: StatusProduct.DISABLED, price: 10 })
    expect(async () => {
      await product.isValid()
    }).rejects.toThrow('Product has errors validate')

    product = new Product({ name: 'hello', status: 'estado-', price: 10 })
    expect(async () => {
      await product.isValid()
    }).rejects.toThrow('the status must be enabled or disabled')


    product = new Product({ name: 'hello', status: '', price: -10 })
    expect(async () => {
      await product.isValid()
    }).rejects.toThrow('the price must be greater or equal zero')
  })

  it('deve validar um produto', async () => {
    const product = new Product({ id: 'ad1c7d38-45fd-438e-b7a6-76e2faaae198', name: 'hello', status: StatusProduct.DISABLED, price: 10 })

    const productIsValid = await product.isValid()

    expect(productIsValid).toBe(true)
  })

})
