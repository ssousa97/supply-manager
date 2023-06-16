import 'react-datepicker/dist/react-datepicker.css'
import AsyncCreatableSelect from 'react-select/async-creatable'
import IntlCurrencyInput from 'react-intl-currency-input'

type TableInputProps = {
  inputType: string | undefined
  value: any
  onChange: (value: any) => void
}

export default function TableInput({ inputType, value, onChange }: TableInputProps) {
  if (inputType?.includes('select')) {
    const optionsType = inputType.split(':')[1]
    return (
      <select
        className="rounded-xl p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        {getSimpleOptions(optionsType).map((option) => (
          <option
            key={option}
            value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  if (inputType?.includes('creatable')) {
    const optionsType = inputType.split(':')[1]
    return (
      <AsyncCreatableSelect
        isClearable
        defaultOptions
        cacheOptions
        formatCreateLabel={(inputValue) => `Adicionar "${inputValue}"`}
        value={{ label: value, value }}
        onChange={(e) => onChange(e?.value)}
        loadOptions={async () => await fetchRemoteOptions(optionsType)}
      />
    )
  }

  if (inputType === 'price') {
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
      type={inputType ?? 'text'}
      className="rounded-xl p-2"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

const getSimpleOptions = (optionsType: string) => {
  switch (optionsType) {
    case 'uf':
      return [
        'AC',
        'AL',
        'AM',
        'AP',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MG',
        'MS',
        'MT',
        'PA',
        'PB',
        'PE',
        'PI',
        'PR',
        'RJ',
        'RN',
        'RO',
        'RR',
        'RS',
        'SC',
        'SE',
        'SP',
        'TO',
      ]
  }
  return []
}

const fetchRemoteOptions = async (optionsType: string) => {
  switch (optionsType) {
    case 'institution': {
      const response = await fetch('http://localhost:3000/api/institutions', {
        method: 'GET',
      })
      const { institutions } = await response.json()
      return institutions.map((institution: any) => {
        return {
          label: institution,
          value: institution,
        }
      })
    }
  }
  return []
}
