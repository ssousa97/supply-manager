import { createColumnHelper } from '@tanstack/react-table'
import Table from '../common/table/Table'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { ContractSchema, IContract } from '../../../types/contract'
import ContractActions from './ContractActions'

const columnHelper = createColumnHelper<IContract>()
const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('categories', {
    header: 'Categorias',
    cell: (value) => value.getValue().join(', '),
    filterFn: (row, columnId, value) => row.original['categories'].some((category) => category.includes(value)),
  }),
  columnHelper.accessor('name', {
    header: 'Nome',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('uf', {
    header: 'UF',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('institution', {
    header: 'Instituição',
    cell: (value) => value.getValue(),
  }),
  columnHelper.accessor('items', {
    header: 'Itens',
    cell: (value) =>
      value
        .getValue()
        .map((item) => item.code)
        .join(', '),
    filterFn: (row, columnId, value) => row.original['items'].some((item) => item.code.includes(value)),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Preço total',
    cell: (value) => <span>R$ {value.getValue().toFixed(2)}</span>,
  }),
  columnHelper.accessor('signedDate', {
    header: 'Assinado',
    cell: (value) => moment(value.getValue()).format('DD/MM/YYYY'),
    meta: {
      inputType: 'date',
    },
    filterFn: (row, columnId, value) =>
      moment(row.original['signedDate']).format('yyyy-MM-DD') === moment(value).format('yyyy-MM-DD'),
  }),
  columnHelper.accessor('dueDate', {
    header: 'Vencimento',
    cell: (value) => moment(value.getValue()).format('DD/MM/YYYY'),
    meta: {
      inputType: 'date',
    },
    filterFn: (row, columnId, value) =>
      moment(row.original['dueDate']).format('yyyy-MM-DD') === moment(value).format('yyyy-MM-DD'),
  }),
]

export default function ContractsTable() {
  const api = 'http://localhost:3000/api/contracts'
  const [contracts, setContracts] = useState<IContract[]>([])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then(({ contracts }) => {
        contracts = contracts.map((contract: IContract) => {
          const parsedContract = ContractSchema.safeParse(contract)
          if (parsedContract.success) return parsedContract.data
          else console.log(parsedContract.error)
        })
        setContracts(contracts)
      })
  }, [])

  return (
    <Table
      model="contract"
      data={contracts}
      setTableData={setContracts}
      columns={columns}
      initialColumnVisibility={{ id: false }}
      actions={<ContractActions />}
    />
  )
}
