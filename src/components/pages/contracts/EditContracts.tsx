import { useReducer, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Contract, EditModelProps, Item } from '../../../../@types'
import { useTableContext } from '../../table/TableContext'
import EditItems from './EditItems'
import AdvancedInput from '../../common/AdvancedInput'

function reducer(state: Contract, action: any): Contract {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload }
    case 'uf':
      return { ...state, uf: action.payload }
    case 'category':
      return { ...state, category: action.payload }
    case 'institution':
      return { ...state, institution: action.payload }
    case 'signedAt':
      return { ...state, signedAt: action.payload }
    case 'due':
      return { ...state, due: action.payload }
    case 'addItem': {
      const newItem: Item = {
        description: action.payload,
        requestedQuantity: 0,
        signedPrice: 0,
        category: '',
        code: '',
        unit: '',
        id: 0,
      }
      return {
        ...state,
        items: state.items ? [...state.items, newItem] : [newItem],
      }
    }
    case 'removeItem':
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      }
    case 'itemRequestedQuantity': {
      const { index, newValue } = action.payload
      state.items[index].requestedQuantity = newValue
      return { ...state }
    }
    case 'itemSignedPrice': {
      const { index, newValue } = action.payload
      state.items[index].signedPrice = newValue
      return { ...state }
    }
    case 'itemUnit': {
      const { index, newValue } = action.payload
      state.items[index].unit = newValue
      return { ...state }
    }
    case 'itemCode': {
      const { index, newValue } = action.payload
      state.items[index].code = newValue
      return { ...state }
    }
    default:
      return state
  }
}

export default function EditContracts({ setOpen, type }: EditModelProps) {
  const { table, setTableData } = useTableContext()
  const cachedContract = localStorage.getItem('contract')
  const initialContract =
    type === 'edit'
      ? (table.getSelectedRowModel().rows[0].original as Contract)
      : cachedContract
      ? (JSON.parse(cachedContract) as Contract)
      : _emptyContract
  const [contract, dispatch] = useReducer(reducer, initialContract)
  const [itemDescription, setItemDescription] = useState('')

  localStorage.setItem('contract', JSON.stringify(contract))
  contract.price = contract.items?.reduce(
    (acc, item) => acc + item.requestedQuantity * item.signedPrice,
    0
  )

  const save = () => {
    if (!validate()) {
      toast('Existem campos faltantes, preencha todos.', { type: 'error' })
      return
    }
    setTableData((data) => {
      if (type === 'edit') {
        data.splice(table.getSelectedRowModel().rows[0].index, 1, contract)
        return [...data]
      }
      return data?.length > 0 ? [...data, contract] : [contract]
    })
    setOpen(false)
  }

  //todo: inform which field is misisng
  const validate = () => {
    if (!contract.name) return false
    if (!contract.uf) return false
    if (!contract.institution) return false
    if (!contract.category) return false
    if (!contract.signedAt) return false
    if (!contract.due) return false
    if (!contract.items) return false
    if (contract.items.length === 0) return false
    if (contract.items.some((item) => !item.description)) return false
    if (contract.items.some((item) => !item.requestedQuantity)) return false
    if (contract.items.some((item) => !item.signedPrice)) return false
    if (contract.items.some((item) => !item.unit)) return false
    if (contract.items.some((item) => !item.code)) return false
    return true
  }
  return (
    <div className="fixed left-[50%] top-[50%] z-20 flex translate-x-[-50%] translate-y-[-50%] flex-col gap-y-4 rounded-xl bg-primary p-4">
      <h1 className="text-lg text-white">Editar Contratos</h1>
      {/* row */}
      <div className="flex justify-between gap-4">
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="name"
            className="text-white">
            Nome
          </label>
          <input
            type="text"
            className="rounded-xl p-2"
            name="name"
            id="name"
            value={contract.name}
            onChange={(e) =>
              dispatch({ type: 'name', payload: e.target.value })
            }
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="uf"
            className="text-white">
            UF
          </label>
          <AdvancedInput
            type="select:normal:uf"
            value={contract.uf}
            onChange={(val) => dispatch({ type: 'uf', payload: val })}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="category"
            className="text-white">
            Categoria
          </label>
          <AdvancedInput
            type="select:creatable:category"
            value={contract.category}
            onChange={(val) => dispatch({ type: 'category', payload: val })}
          />
        </div>
        <div className="flex  flex-1 flex-col">
          <label
            htmlFor="price"
            className="text-white">
            Preço total
          </label>
          <span className="text-2xl text-white">{'R$: ' + contract.price}</span>
        </div>
      </div>
      {/* row */}
      <div className="flex flex-col">
        <label
          htmlFor="institution"
          className="text-white">
          Instituição
        </label>
        <AdvancedInput
          type="select:creatable:institution"
          value={contract.institution}
          onChange={(val) => dispatch({ type: 'institution', payload: val })}
        />
      </div>
      {/* row */}
      <div className="flex flex-col">
        <div className="relative flex flex-col">
          <label
            htmlFor="items"
            className="text-white">
            Itens
          </label>
          <input
            type="text"
            className="rounded-xl p-2"
            name="items"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            id="items"
          />
          <div
            onClick={() =>
              dispatch({ type: 'addItem', payload: itemDescription })
            }
            className="absolute right-2 top-[45%] rounded-full bg-secondary p-1 hover:cursor-pointer hover:bg-tertiary">
            <FaPlus className="text-2xl text-white" />
          </div>
        </div>
        <ul className="ml-1 mt-2">
          {contract.items?.map((item, index) => (
            <EditItems
              key={index}
              index={index}
              item={item}
              dispatch={dispatch}
            />
          ))}
        </ul>
      </div>
      {/* row */}
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="signed"
            className="text-white">
            Assinado em
          </label>
          <input
            type="date"
            className="rounded-xl p-2"
            name="signed"
            id="signed"
            value={contract.signedAt}
            onChange={(e) =>
              dispatch({ type: 'signedAt', payload: e.target.value })
            }
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label
            htmlFor="signed"
            className="text-white">
            Vencimento em
          </label>
          <input
            type="date"
            className="rounded-xl p-2"
            name="due"
            id="due"
            value={contract.due}
            onChange={(e) => dispatch({ type: 'due', payload: e.target.value })}
          />
        </div>
      </div>
      {/* row */}
      <div className="flex justify-end">
        <button
          onClick={save}
          className="rounded-xl bg-secondary p-2 text-lg text-white hover:bg-tertiary">
          Salvar
        </button>
      </div>
    </div>
  )
}

const _emptyContract: Contract = {
  name: '',
  uf: '',
  price: 0,
  institution: '',
  items: [] as Item[],
  signedAt: '',
  due: '',
  id: '',
  category: '',
}
