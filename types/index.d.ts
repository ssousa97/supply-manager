export type Column = {
  id: string
  label: string
  isVisible: boolean
  suffix?: string
  prefix?: string
  format?: (value: any) => string
}

export type Model = {
  columns: Column[]
  data: unknown[]
  viewData: unknown[]
}

export type Order = {
  id: string
  code: string
  checkInDate: string
  portal: string
  daysUntilExpiration: number
  dueDate: Moment
  institution: string
  tradeNumber: string
  uf: string
  receipt: string
  itemsCategory: string[]
  shipping: string
  shippingFee: string
  postalCode: string
  status: string
  dispatchDate: Moment
  deliveryDate: Moment
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

export type Institution = {
  id: number
  name: string
  uf: string
}
