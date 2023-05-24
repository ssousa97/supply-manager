export type Model<T> = {
  columns: (keyof T)[]
  data: T[]
  viewData: T[]
}

export type Order = {
  id: string
  code: string
  checkInDate: string
  portal: string
  daysUntilExpiration: number
  dueDate: string
  institution: string
  tradeNumber: string
  uf: string
  receipt: string
  itemsCategory: string[]
  shipping: string
  shippingFee: string
  postalCode: string
  status: string
  dispatchDate: string
  deliveryDate: string
  price: number
}

export type Contract = {
  id: string
  name: string
  uf: string
  institution: string
  items: string[]
  category: string
  price: number
  signed: string
  due: string
}

export type Item = {
  id: string
  name: string
  uf: string
  institution: string
  items: string[]
  category: string
  price: number
  signed: string
  due: string
}
