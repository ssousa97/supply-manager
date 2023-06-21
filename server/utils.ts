import { faker } from '@faker-js/faker'
import { Contract, Material, Order } from '../@types'

export function createRandomOrders(size = 100) {
  const randomOrders: Order[] = []
  for (let i = 0; i < size; i++) {
    randomOrders.push({
      id: faker.string.uuid(),
      code: faker.string.uuid(),
      checkInDate: faker.date.past().toDateString(),
      portal: faker.internet.domainName(),
      daysUntilExpiration: faker.number.int({ min: 1, max: 30 }),
      dueDate: faker.date.future().toDateString(),
      institution: faker.company.name(),
      tradeNumber: faker.finance.routingNumber(),
      uf: faker.helpers.arrayElement(['RJ', 'SP', 'MG', 'ES']),
      receipt: faker.string.uuid(),
      itemsCategory: ['123'],
      shipping: faker.company.name(),
      shippingFee: faker.commerce.price(),
      postalCode: faker.location.zipCode(),
      status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered']),
      dispatchDate: faker.date.past().toDateString(),
      deliveryDate: faker.date.future().toDateString(),
      price: faker.number.int(),
    })
  }
  return randomOrders
}

export function createRandomMaterials(size = 100) {
  const randomMaterials: Material[] = []
  for (let i = 0; i < size; i++) {
    randomMaterials.push({
      id: faker.number.int(),
      description: faker.company.name(),
      category: faker.commerce.department(),
      unitPrice: faker.number.int(),
      code: faker.string.alphanumeric(),
      unit: faker.helpers.arrayElement(['boxWith10', 'boxWith5', 'boxWith3', 'unitary']),
      unitQuantity: faker.number.int(),
    })
  }
  return randomMaterials
}

export function createRandomContracts(size = 100) {
  const randomContracts: Contract[] = []
  for (let i = 0; i < size; i++) {
    randomContracts.push({
      id: faker.number.int().toString(),
      name: faker.company.name(),
      uf: ['SP', 'RJ', 'MG', 'ES'][faker.number.int({ min: 0, max: 3 })],
      institution: faker.company.name(),
      items: [
        faker.commerce.productName(),
        faker.commerce.productName(),
        faker.commerce.productName(),
      ],
      category: faker.commerce.department(),
      price: faker.number.int(),
      signedAt: faker.date.past().toDateString(),
      due: faker.date.past().toDateString(),
    })
  }
  return randomContracts
}
