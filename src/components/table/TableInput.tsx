import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type TableInputProps = {
  inputType: string | undefined
  value: any
  onChange: (value: any) => void
}

export default function TableInput({ inputType, value, onChange }: TableInputProps) {
  if (inputType?.includes('select')) {
    const options = inputType.split(':')[1]
    return (
      <select
        className="rounded-xl p-2"
        value={value}
        onChange={onChange}>
        {getOptions(options).map((option) => (
          <option
            key={option}
            value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  if (inputType === 'date') {
    return (
      <DatePicker
        selected={value}
        onChange={onChange}
      />
    )
  }

  return (
    <input
      type={inputType ?? 'text'}
      className="rounded-xl p-2"
      value={value}
      onChange={onChange}
    />
  )
}

const getOptions = (options: string) => {
  switch (options) {
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
