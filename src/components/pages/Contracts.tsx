import { useEffect, useState } from 'react'
import { Contract, Model } from '../../../types'
import TableModel from '../table/TableModel'

const ContractsModel: Model<Contract> = {
  columns: ['id', 'category', 'name', 'uf', 'institution', 'items', 'price', 'signed', 'due'],
  viewColumns: [],
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
          viewColumns: contractsModel.columns,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-4 grid h-full grid-rows-[1fr_9fr] gap-y-2">
      <TableModel
        loading={loading}
        model={contractsModel}
        setModel={setContractsModel}
      />
    </div>
  )
}
