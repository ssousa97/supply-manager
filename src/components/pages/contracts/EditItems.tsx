import { Dispatch } from 'react'
import { FaMinus } from 'react-icons/fa'

import { Item } from '../../../../@types'

type EditItemsProps = {
  index: number
  item: Item
  dispatch: Dispatch<any>
}
export default function EditItems({ index, item, dispatch }: EditItemsProps) {
  return (
    <div className="m-2 flex items-center justify-between gap-x-1 rounded-xl border-2 p-2">
      <div className="flex gap-x-2">
        <button
          onClick={() => dispatch({ type: 'removeItem', payload: index })}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary hover:cursor-pointer hover:bg-red-500">
          <FaMinus />
        </button>
        <li className="break-words text-sm text-white">{item.description}</li>
      </div>
      <div className="ml-4 flex gap-x-2">
        <div className="flex flex-col">
          <label className="text-xs text-white">Qtd.</label>
          <input
            type="number"
            min={0}
            value={item.requestedQuantity}
            onChange={(e) =>
              dispatch({
                type: 'requestedQuantity',
                payload: { newValue: e.target.value, index },
              })
            }
            className="w-16 rounded-xl p-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-white">Preço un.</label>
          <input
            type="text"
            value={item.signedPrice}
            onChange={(e) =>
              dispatch({
                type: 'signedPrice',
                payload: { newValue: e.target.value, index },
              })
            }
            className="w-16 rounded-xl p-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-white">Codigo</label>
          <input
            type="text"
            value={item.code}
            onChange={(e) =>
              dispatch({
                type: 'code',
                payload: { newValue: e.target.value, index },
              })
            }
            className="w-24 rounded-xl p-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-white">Unidade</label>
          <input
            type="text"
            value={item.unit}
            onChange={(e) =>
              dispatch({
                type: 'unit',
                payload: { newValue: e.target.value, index },
              })
            }
            className="w-16 rounded-xl p-1"
          />
        </div>
      </div>
    </div>
  )
}
