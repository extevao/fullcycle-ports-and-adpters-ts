import { Product } from "../application/product"

describe('product test', () => {

  it('deve lancar um erro ao habilitar um produto quando preco for 0', () => {
    expect(() => {
      const product = new Product({ name: 'Teste', price: 0 })
      product.enable()
    }).toThrow()
  })

  it('deve habilitar um produto', () => {
    const product = new Product({ name: 'Teste', price: 10, })
    product.enable()

    expect(product.getStatus()).toBe('enabled')
  })
})
