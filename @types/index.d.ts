declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    isCreatable?: boolean
    isEditable?: boolean
    inputType?: string
  }
}

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

export type Item = {
  id: number
  code: string
  description: string
  category: string
  unit: string
  signedPrice: number
  requestedQuantity: number
}

export type Contract = {
  id: string
  name: string
  uf: string
  institution: string
  items: Item[]
  category: string
  price: number
  signedAt: string
  due: string
}

export type Material = {
  id: number
  code: string
  description: string
  category: string
  unit: string
  unitPrice: number
  unitQuantity: number
}

export type Institution = {
  id: number
  name: string
  uf: string
}

export type EditModelProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
  type: 'add' | 'edit'
}

export type Migrations = {
  id: number
  name: string
  timestamp: string
}
