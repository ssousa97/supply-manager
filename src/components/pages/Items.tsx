import { useEffect, useState } from 'react'
import { Model } from '../../../types'

const ItemsModel: Model = {
  columns: [
    {
      id: 'id',
      label: 'Id',
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
      id: 'category',
      label: 'Categoria',
      isVisible: true,
    },
    {
      id: 'price',
      label: 'Preço',
      isVisible: true,
      prefix: 'R$',
    },
  ],
  data: [],
  viewData: [],
}

export default function Items() {
  const [itemsModel, setItemsModel] = useState(ItemsModel)
  const [selected, setSelected] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/items')
      .then((response) => response.json())
      .then(({ items }) => {
        setItemsModel({
          data: items,
          columns: itemsModel.columns,
          viewData: items,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return <></>
}
