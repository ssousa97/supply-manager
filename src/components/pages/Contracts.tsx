import { useEffect, useState } from 'react'
import { Model } from '../../../types'

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

  return <></>
}
