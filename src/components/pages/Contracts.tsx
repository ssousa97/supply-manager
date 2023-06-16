import { useEffect, useState } from 'react'
import { Contract } from '../../../types'
import Table from '../table/Table'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'

const columnHelper = createColumnHelper<Contract>()

const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
    cell: (item) => item.getValue(),
  }),
  columnHelper.accessor('category', {
    header: 'Categoria',
    cell: (item) => item.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
    },
  }),
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: (item) => item.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
    },
  }),
  columnHelper.accessor('uf', {
    header: 'UF',
    cell: (item) => item.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
      inputType: 'select:uf',
    },
  }),
  columnHelper.accessor('institution', {
    header: 'Instituição',
    cell: (item) => item.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
      inputType: 'creatable:institution',
    },
  }),
  columnHelper.accessor('items', {
    header: 'Itens',
    cell: (item) => item.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
    },
  }),
  columnHelper.accessor('price', {
    header: 'Preço',
    cell: (item) => <span>R$ {item.getValue()}</span>,
    meta: {
      isEditable: true,
      isCreatable: true,
      inputType: 'price',
    },
  }),
  columnHelper.accessor('signed', {
    header: 'Assinado',
    cell: (item) => moment(item.getValue()).format('DD/MM/YYYY'),
    meta: {
      isEditable: true,
      isCreatable: true,
      inputType: 'date',
    },
  }),
  columnHelper.accessor('due', {
    header: 'Vencimento',
    cell: (item) => moment(item.getValue()).format('DD/MM/YYYY'),
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
      model="contracts"
      data={contracts}
      setTableData={setContracts}
      api={api}
      columns={columns}
      initialColumnVisibility={{ id: false }}
    />
  )
}
