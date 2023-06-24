import { createColumnHelper } from '@tanstack/react-table'
import Table from '../common/table/Table'
import moment from 'moment'
import { useState, useEffect } from 'react'

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

const columnHelper = createColumnHelper<Contract>()
const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('category', {
    header: 'Categoria',
    cell: (value) => value.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
    },
  }),
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: (value) => value.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
    },
  }),
  columnHelper.accessor('uf', {
    header: 'UF',
    cell: (value) => value.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
      inputType: 'select:normal:uf',
    },
  }),
  columnHelper.accessor('institution', {
    header: 'Instituição',
    cell: (value) => value.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
      inputType: 'select:creatable:institution',
    },
  }),
  columnHelper.accessor('items', {
    header: 'Itens',
    cell: (value) => value.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
      //inputType: 'select:creatable:itemDescription', TODO
    },
  }),
  columnHelper.accessor('price', {
    header: 'Preço',
    cell: (value) => <span>R$ {value.getValue()}</span>,
    meta: {
      isEditable: true,
      isCreatable: true,
      inputType: 'price',
    },
  }),
  columnHelper.accessor('signedAt', {
    header: 'Assinado',
    cell: (value) => moment(value.getValue()).format('DD/MM/YYYY'),
    meta: {
      isEditable: true,
      isCreatable: true,
      inputType: 'date',
    },
  }),
  columnHelper.accessor('due', {
    header: 'Vencimento',
    cell: (value) => moment(value.getValue()).format('DD/MM/YYYY'),
    meta: {
      isEditable: true,
      isCreatable: true,
      inputType: 'date',
    },
  }),
]

export default function Contracts() {
  const api = 'http://localhost:3000/api/contracts'
  const [contracts, setContracts] = useState<Contract[]>([])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setContracts(data.contracts as Contract[]))
  }, [])

  return (
    <Table
      model="contract"
      data={contracts}
      setTableData={setContracts}
      api={api}
      columns={columns}
      initialColumnVisibility={{ id: false }}
    />
  )
}
