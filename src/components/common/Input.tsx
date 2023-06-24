import AsyncCreatableSelect from 'react-select/async-creatable'
import AsyncSelect from 'react-select/async'
import IntlCurrencyInput from 'react-intl-currency-input'
import { getOptions } from '../../services/getOptions'

type InputProps = {
  type: string
  value: any
  className?: string
  onChange: (value: any) => void
}
export default function Input({
  type,
  value,
  className,
  onChange,
}: InputProps) {
  const [inputType, mode, optionType] = type.split(':')

  if (inputType === 'select') {
    switch (mode) {
      case 'normal': {
        return (
          <AsyncSelect
            unstyled
            defaultOptions
            cacheOptions
            classNames={{
              control: () => `input ${className ?? ''}`,
              menu: () => 'bg-neutral p-2',
              option: () => 'hover:bg-accent pl-2',
            }}
            defaultValue={value}
            onChange={(value) => onChange(value.value)}
            loadOptions={async () => await getOptions(optionType)}
          />
        )
      }
      case 'creatable': {
        return (
          <AsyncCreatableSelect
            unstyled
            defaultOptions
            cacheOptions
            classNames={{
              control: () => `input !min-h-[2rem] ${className ?? ''} `,
              menu: () => 'bg-neutral p-2',
              option: () => 'hover:bg-accent pl-2',
            }}
            defaultValue={value}
            onChange={(value) => onChange(value.value)}
            loadOptions={async () => await getOptions(optionType)}
          />
        )
      }
    }
  }
  if (type === 'price') {
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
        inputRef={(ref) =>
          ref && ref.classList.add('input', `${className ?? ''}`)
        }
        onChange={(e, value, maskedValue) => onChange(value)}
        defaultValue={value}
        max={Number.MAX_SAFE_INTEGER}
      />
    )
  }
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`input ${className ?? ''}`}
    />
  )
}
