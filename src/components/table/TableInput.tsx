import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AsyncCreatableSelect from 'react-select/async-creatable'

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
        loadOptions={async () => await getComplexOptions(optionsType)}
      />
    )
  }

  if (inputType === 'date') {
    return (
      <DatePicker
        className="rounded-xl p-2"
        selected={value}
        onChange={onChange}
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

const getComplexOptions = async (optionsType: string) => {
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
