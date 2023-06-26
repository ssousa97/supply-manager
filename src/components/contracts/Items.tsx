import { Dispatch } from 'react'
import { Item } from './Contracts'
import Input from '../common/Input'
import Select from '../common/Select'

type ItemsProps = {
  items: Item[]
  dispatch: Dispatch<any>
}
export default function Items({ items, dispatch }: ItemsProps) {
  return (
    <ul className="flex-1 overflow-auto">
      {items?.map((item, index) => (
        <li
          key={index}
          className="my-3 flex items-center">
          <div className="collapse-arrow collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              {item.description}
            </div>
            <div className="collapse-content m-2 rounded-lg">
              <div className="flex gap-2">
                <div className="flex flex-[2] flex-col">
                  <label htmlFor="description">Descrição</label>
                  <input
                    type="text"
                    className="input input-sm"
                    value={item.description}
                    onChange={(e) =>
                      dispatch({
                        type: 'itemDescription',
                        payload: { index, description: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="description">Código</label>
                  <input
                    type="text"
                    className="input input-sm"
                    value={item.code}
                    onChange={(e) =>
                      dispatch({
                        type: 'itemCode',
                        payload: { index, code: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="description">Categoria</label>
                  <Select
                    optionType="category"
                    value={item.category}
                    className="input-sm"
                    onChange={(val) =>
                      dispatch({
                        type: 'itemCategory',
                        payload: { index, category: val },
                      })
                    }
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="flex w-[50%] gap-2">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="description">Unidade</label>
                  <input
                    type="text"
                    className="input input-sm"
                    value={item.unit}
                    onChange={(e) =>
                      dispatch({
                        type: 'itemUnit',
                        payload: { index, unit: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="description">Quantidade solicitada</label>
                  <input
                    type="number"
                    min={0}
                    className="input input-sm"
                    value={item.requestedQuantity}
                    onChange={(e) =>
                      dispatch({
                        type: 'itemRequestedQuantity',
                        payload: { index, quantity: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="signedPrice">Preço contratado</label>
                  <Input
                    type="price"
                    className="input-sm"
                    value={item.signedPrice}
                    onChange={(val) =>
                      dispatch({
                        type: 'itemSignedPrice',
                        payload: { index, price: val },
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  className="btn-error btn-sm btn"
                  onClick={() =>
                    dispatch({ type: 'removeItem', payload: index })
                  }>
                  Remover
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
