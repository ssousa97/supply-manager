import { useEffect, useState } from 'react'
import { Contract } from '../../../types'
import Table from '../table/Table'
import { createColumnHelper } from '@tanstack/react-table'
import DateInput from '../common/DateInput'

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
      //TODO: Remove the input from column def and put it inside AddDialog and EditDialog, much easier to customize and understand
      input: (value, onChange) => (
        <select
          value={value}
          className="rounded-xl p-2"
          onChange={(e) => onChange(e.target.value)}>
          <option value="AL">AL</option>
          <option value="BA">BA</option>
          <option value="CE">CE</option>
          <option value="DF">DF</option>
          <option value="ES">ES</option>
          <option value="GO">GO</option>
          <option value="MA">MA</option>
          <option value="MG">MG</option>
          <option value="MS">MS</option>
          <option value="MT">MT</option>
          <option value="PA">PA</option>
          <option value="PB">PB</option>
          <option value="PE">PE</option>
          <option value="PI">PI</option>
          <option value="PR">PR</option>
          <option value="RJ">RJ</option>
          <option value="RN">RN</option>
          <option value="RO">RO</option>
          <option value="RR">RR</option>
          <option value="RS">RS</option>
          <option value="SC">SC</option>
          <option value="SE">SE</option>
          <option value="SP">SP</option>
          <option value="TO">TO</option>
        </select>
      ),
    },
  }),
  columnHelper.accessor('institution', {
    header: 'Instituição',
    cell: (item) => item.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
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
    cell: (item) => item.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
    },
  }),
  columnHelper.accessor('signed', {
    header: 'Assinado',
    cell: (item) => {
      console.log(item.getValue())
      return item.getValue()
    },
    meta: {
      isEditable: true,
      isCreatable: true,
      input: (value, onChange) => (
        <DateInput
          value={value ? new Date(value) : new Date()}
          onChange={onChange}
        />
      ),
    },
  }),
  columnHelper.accessor('due', {
    header: 'Vencimento',
    cell: (item) => item.getValue(),
    meta: {
      isEditable: true,
      isCreatable: true,
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
      .then((data) => {
        console.log(data)
        setContracts(data.contracts as Contract[])
      })
  }, [])

  return (
    <Table
      data={contracts}
      setTableData={setContracts}
      api={api}
      columns={columns}
      initialColumnVisibility={{ id: false }}
    />
  )
}
