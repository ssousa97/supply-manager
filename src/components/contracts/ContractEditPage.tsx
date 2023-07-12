import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useReducer, useRef } from 'react'
import Select from '../common/forms/Select'
import { Contract } from '../../../types/contract'
import MultiSelect from '../common/forms/MultiSelect'
import moment from 'moment'
import ContractItems from './ContractItems'
import { ContractItem } from '../../../types/item'
import { toast } from 'react-hot-toast'

const newContract: Contract = {
  name: '',
  uf: '',
  institution: '',
  signedDate: new Date(),
  dueDate: new Date(),
  categories: [],
  items: [],
  totalPrice: 0,
}

function reducer(state: Contract, action: any): Contract {
  switch (action.type) {
    case 'set':
      return { ...action.payload }
    case 'name':
      return { ...state, name: action.payload }
    case 'uf':
      return { ...state, uf: action.payload }
    case 'signedDate':
      return { ...state, signedDate: action.payload }
    case 'institution':
      return { ...state, institution: action.payload }
    case 'categories':
      return {
        ...state,
        categories: [...action.payload],
      }
    case 'itemDescription': {
      const { index, description } = action.payload
      state.items[index].description = description
      return { ...state }
    }
    case 'itemCode': {
      const { index, code } = action.payload
      state.items[index].code = code
      return { ...state }
    }
    case 'itemAmountPerBatch': {
      const { index, amountPerBatch } = action.payload
      state.items[index].amountPerBatch = amountPerBatch
      return { ...state }
    }
    case 'itemTotalRequestedBatchQuantity': {
      const { index, totalRequestedBatchQuantity } = action.payload
      state.items[index].totalRequestedBatchQuantity = totalRequestedBatchQuantity
      return { ...state }
    }
    case 'itemSignedPricePerBatch': {
      const { index, signedPricePerBatch } = action.payload
      state.items[index].signedPricePerBatch = signedPricePerBatch
      return { ...state }
    }
    case 'removeItem': {
      return { ...state, items: state.items.filter((_, i) => i !== action.payload) }
    }
    case 'addItem': {
      const newItem: ContractItem = {
        amountPerBatch: 0,
        code: '',
        description: action.payload,
        signedPricePerBatch: 0,
        totalRequestedBatchQuantity: 0,
      }
      return {
        ...state,
        items: state.items ? [...state.items, newItem] : [newItem],
      }
    }
  }
  return { ...state }
}

export default function ContractEditPage() {
  const { id } = useParams()
  const [contract, dispatch] = useReducer(reducer, newContract)
  const itemDescriptionRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (id === 'new') return
    fetch(`http://localhost:3000/api/contracts/${id}`)
      .then((res) => res.json())
      .then(({ contract }) => dispatch({ type: 'set', payload: contract }))
  }, [])

  contract.dueDate = moment(contract.signedDate, true).add(12, 'months').toDate()
  contract.totalPrice =
    contract.items?.reduce((acc, item) => acc + item.signedPricePerBatch * item.totalRequestedBatchQuantity, 0) ?? 0

  const addItem = (description: string | undefined) => {
    if (description === undefined || description === '' || description === null) return
    dispatch({
      type: 'addItem',
      payload: description,
    })
    itemDescriptionRef.current?.focus()
    itemDescriptionRef.current!.value = ''
  }

  return (
    <div className="grid place-items-center">
      <div className="flex max-h-[90%] min-h-[90%] w-[50%] flex-col gap-y-4 rounded-lg  bg-base-200 p-6 shadow-2xl">
        <div className="flex w-[50%] justify-between">
          <div>
            <label>Valor total:</label>
            <span className="block text-2xl">R$: {contract.totalPrice.toFixed(2)}</span>
          </div>
          <div>
            <label>Vencimento</label>
            <span className="block text-2xl">{moment(contract.dueDate).format('DD/MM/YYYY')}</span>
          </div>
        </div>
        <div className="flex justify-between gap-x-6">
          <div className="flex-[5]">
            <label>Nome</label>
            <input
              type="text"
              value={contract.name}
              onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
              className="input block w-full"
            />
          </div>
          <div className="flex-1">
            <label>Data de assinatura</label>
            <input
              type="date"
              value={moment(contract.signedDate).format('yyyy-MM-DD')}
              onChange={(e) => dispatch({ type: 'signedDate', payload: e.target.value })}
              className="input block w-full"
            />
          </div>
          <div className="flex-1">
            <label>UF</label>
            <Select
              initialValue={contract.uf}
              className="w-full"
              onSelect={(value) => dispatch({ type: 'uf', payload: value })}
              optionType="uf"
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex-1">
            <label htmlFor="">Categorias</label>
            <MultiSelect
              values={contract.categories}
              onSelect={(value) => dispatch({ type: 'categories', payload: value })}
              optionType="categories"
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="">Instituição</label>
            <Select
              initialValue={contract.institution}
              onSelect={(values) => dispatch({ type: 'institution', payload: values })}
              optionType="institutions"
              className="w-full "
            />
          </div>
        </div>
        <label htmlFor="">Adicionar item</label>
        <div className="join">
          <input
            type="text"
            className="input join-item w-full"
            ref={itemDescriptionRef}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                addItem(itemDescriptionRef.current?.value)
              }
            }}
          />
          <button
            onClick={() => addItem(itemDescriptionRef.current?.value)}
            className="join-item btn bg-accent">
            +
          </button>
        </div>
        <ContractItems
          items={contract.items}
          dispatch={dispatch}
        />
        <div className="flex justify-center gap-x-2">
          <button
            className="btn-accent btn"
            onClick={async () => {
              const result = await fetch('http://localhost:3000/api/contracts/upsert', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(contract),
              }).then((res) => res.json())
              if (result.status !== 'success') {
                toast.error(<b>{result.message}</b>, { duration: 5000 })
                return
              } else {
                toast.success('Contrato salvo com sucesso')
                navigate('/contracts')
              }
            }}>
            Salvar
          </button>
          <button className="btn-error btn">Limpar</button>
        </div>
      </div>
    </div>
  )
}
