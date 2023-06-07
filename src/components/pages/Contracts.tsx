import { useEffect, useState } from 'react'
import { Model } from '../../../types'
import TableModel from '../table/TableModel'
import TableData from '../table/TableData'
import TableControl from '../table/TableControl'
import TableSkeleton from '../table/TableSkeleton'

const ContractsModel: Model = {
  columns: [
    {
      id: 'id',
      label: 'Id',
      isVisible: true,
    },
    {
      id: 'category',
      label: 'Categoria',
      isVisible: true,
    },
    {
      id: 'name',
      label: 'Nome',
      isVisible: true,
    },
    {
      id: 'uf',
      label: 'UF',
      isVisible: true,
    },
    {
      id: 'institution',
      label: 'Instituição',
      isVisible: true,
    },
    {
      id: 'items',
      label: 'Itens',
      isVisible: true,
    },
    {
      id: 'price',
      label: 'Preço',
      isVisible: true,
    },
    {
      id: 'signed',
      label: 'Assinado',
      isVisible: true,
    },
    {
      id: 'due',
      label: 'Vencimento',
      isVisible: true,
    },
  ],
  data: [],
  viewData: [],
}

export default function Contracts() {
  const [contractsModel, setContractsModel] = useState(ContractsModel)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/contracts')
      .then((response) => response.json())
      .then(({ contracts }) => {
        setContractsModel({
          data: contracts,
          columns: contractsModel.columns,
          viewData: contracts,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-4 grid h-full grid-rows-[1fr_9fr] gap-y-2">
      <TableModel
        model={contractsModel}
        setModel={setContractsModel}>
        <TableControl />
        {loading ? <TableSkeleton /> : <TableData />}
      </TableModel>
    </div>
  )
}
