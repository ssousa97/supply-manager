import { Dispatch } from 'react'
import PriceInput from '../common/forms/PriceInput'
import { IOrderItem } from '../../../types/item'
import Select from '../common/forms/Select'

type ItemsProps = {
  items: IOrderItem[]
  dispatch: Dispatch<any>
}
export default function OrderItems({ items, dispatch }: ItemsProps) {
  return (
    <ul className="flex-1 overflow-auto">
      {items?.map((item, index) => (
        <li
          key={index}
          className="my-3 flex items-center rounded-lg">
          <div className="collapse-arrow collapse bg-accent">
            <input type="checkbox" />
            <div className="collapse-title text-sm font-medium">{item.description}</div>
            <div className="collapse-content rounded-lg">
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
                  <Select
                    initialValue={item.code}
                    onSelect={(val) => dispatch({ type: 'itemCode', payload: { index, code: val } })}
                    optionType="itemsCodes"
                    className="input-sm"
                  />
                </div>
              </div>
              <div className="divider"></div>
              <div className="flex gap-2">
                <div className="flex flex-1 flex-col">
                  <label
                    htmlFor="description"
                    className="text-sm">
                    Total de unidades solicitadas
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="input input-sm"
                    value={item.requestedBatchQuantity}
                    onChange={(e) =>
                      dispatch({
                        type: 'itemRequestedBatchQuantity',
                        payload: { index, requestedBatchQuantity: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label
                    htmlFor="description"
                    className="text-sm">
                    Quantidade por unidade
                  </label>
                  <input
                    type="text"
                    className="input input-sm"
                    value={item.amountPerBatch}
                    onChange={(e) =>
                      dispatch({
                        type: 'itemAmountPerBatch',
                        payload: { index, amountPerBatch: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <label
                    htmlFor="signedPrice"
                    className="text-sm">
                    Preço contratado por unidade
                  </label>
                  <PriceInput
                    className="input-sm"
                    value={item.signedPricePerBatch}
                    onChange={(val) =>
                      dispatch({
                        type: 'itemSignedPricePerBatch',
                        payload: { index, signedPricePerBatch: val },
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  className="btn-error btn-sm btn"
                  onClick={() => dispatch({ type: 'removeItem', payload: index })}>
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
