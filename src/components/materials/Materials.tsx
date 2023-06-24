import { createColumnHelper } from '@tanstack/react-table'
import { useState, useEffect } from 'react'
import Table from '../common/table/Table'

export type Material = {
  id: number
  code: string
  description: string
  category: string
  unit: string
  unitPrice: number
  unitQuantity: number
}

const columnHelper = createColumnHelper<Material>()
const defaultColumns = [
  columnHelper.accessor('id', {
    header: 'Id',
    cell: (value) => <span>{value.getValue()}</span>,
  }),
  columnHelper.accessor('code', {
    header: 'Código',
    cell: (value) => <span>{value.getValue()}</span>,
  }),
  columnHelper.accessor('description', {
    header: 'Descrição',
    cell: (value) => <span>{value.getValue()}</span>,
  }),
  columnHelper.accessor('category', {
    header: 'Categoria',
    cell: (value) => <span>{value.getValue()}</span>,
  }),
  columnHelper.accessor('unit', {
    header: 'Tipo de unidade',
    cell: (value) => <span>{value.getValue()}</span>,
  }),
  columnHelper.accessor('unitPrice', {
    header: 'Preço unitário',
    cell: (value) => <span>{value.getValue()}</span>,
    meta: { inputType: 'price' },
  }),
  columnHelper.accessor('unitQuantity', {
    header: 'Quantidade unitária',
    cell: (value) => <span>{value.getValue()}</span>,
  }),
]

export default function Materials() {
  const api = 'http://localhost:3000/api/materials'
  const [materials, setMaterials] = useState<Material[]>([])
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setMaterials(data.materials as Material[]))
  }, [])

  return (
    <Table
      model="material"
      data={materials}
      setTableData={setMaterials}
      api={api}
      columns={columns}
      initialColumnVisibility={{ id: false }}
    />
  )
}
