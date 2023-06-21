import AsyncCreatableSelect from 'react-select/async-creatable'
import AsyncSelect from 'react-select/async'
import IntlCurrencyInput from 'react-intl-currency-input'

type AdvancedInputProps = {
  type: string | undefined
  value: any
  onChange: (value: any) => void
}
export default function AdvancedInput({
  type,
  value,
  onChange,
}: AdvancedInputProps) {
  if (type?.startsWith('select')) {
    const [, selectType, optionsType] = type.split(':')
    if (selectType === 'creatable') {
      return (
        <AsyncCreatableSelect
          isClearable
          defaultOptions
          cacheOptions
          formatCreateLabel={(inputValue) => `Adicionar "${inputValue}"`}
          value={{ label: value, value }}
          onChange={(e) => onChange(e?.value)}
          loadOptions={async () => await getOptions(optionsType)}
        />
      )
    }
    if (selectType === 'normal') {
      return (
        <AsyncSelect
          isClearable
          cacheOptions
          defaultOptions
          value={{ label: value, value }}
          onChange={(e) => onChange(e?.value)}
          loadOptions={async () => await getOptions(optionsType)}
        />
      )
    }
  }
  if (type?.startsWith('price')) {
    return (
      <IntlCurrencyInput
        currency="BRL"
        config={{
          locale: 'pt-BR',
          formats: {
            number: {
              BRL: {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            },
          },
        }}
        inputRef={(ref) => ref && ref.classList.add('rounded-xl', 'p-2')}
        onChange={(e, value, maskedValue) => onChange(value)}
        defaultValue={value}
        max={Number.MAX_SAFE_INTEGER}
      />
    )
  }
  return (
    <input
      type={type ?? 'text'}
      className="rounded-xl p-2"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

const getOptions = async (optionsType: string) => {
  switch (optionsType) {
    case 'institution':
      return await getInstitutions()
    case 'uf':
      return await getUfs()
    case 'category':
      return await getCategories()
    case 'itemDescription':
      return await getItemsDescription()
    default:
      return []
  }
}

async function getInstitutions() {
  const { institutions } = await fetch(
    'http://localhost:3000/api/institutions'
  ).then((res) => res.json())
  return institutions.map((institution: any) => ({
    label: institution,
    value: institution,
  }))
}

async function getCategories() {
  throw new Error('Function not implemented.')
}

async function getItemsDescription() {
  throw new Error('Function not implemented.')
}

async function getUfs() {
  return [
    { label: 'AC', value: 'AC' },
    { label: 'AL', value: 'AL' },
    { label: 'AM', value: 'AM' },
    { label: 'AP', value: 'AP' },
    { label: 'BA', value: 'BA' },
    { label: 'CE', value: 'CE' },
    { label: 'DF', value: 'DF' },
    { label: 'ES', value: 'ES' },
    { label: 'GO', value: 'GO' },
    { label: 'MA', value: 'MA' },
    { label: 'MG', value: 'MG' },
    { label: 'MS', value: 'MS' },
    { label: 'MT', value: 'MT' },
    { label: 'PA', value: 'PA' },
    { label: 'PB', value: 'PB' },
    { label: 'PE', value: 'PE' },
    { label: 'PI', value: 'PI' },
    { label: 'PR', value: 'PR' },
    { label: 'RJ', value: 'RJ' },
    { label: 'RN', value: 'RN' },
    { label: 'RO', value: 'RO' },
    { label: 'RR', value: 'RR' },
    { label: 'RS', value: 'RS' },
    { label: 'SC', value: 'SC' },
    { label: 'SE', value: 'SE' },
    { label: 'SP', value: 'SP' },
    { label: 'TO', value: 'TO' },
  ]
}
