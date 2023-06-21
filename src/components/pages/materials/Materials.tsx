import { useEffect, useState } from 'react'
import Table from '../../table/Table'
import { Material } from '../../../../@types'
import { createColumnHelper } from '@tanstack/react-table'

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
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns])
  const [materials, setMaterials] = useState<Material[]>([])
  const api = 'http://localhost:3000/api/materials'

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setMaterials(data.materials as Material[]))
  }, [])
  return (
    <Table
      model="materials"
      data={materials}
      setTableData={setMaterials}
      api={api}
      columns={columns}
      initialColumnVisibility={{ id: false }}
    />
  )
}
