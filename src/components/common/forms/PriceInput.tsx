import IntlCurrencyInput from 'react-intl-currency-input'

type InputProps = {
  value: any
  className?: string
  onChange: (value: any) => void
}
export default function PriceInput({ value, className, onChange }: InputProps) {
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
      inputRef={(ref) => ref && ref.classList.add('input', `${className ?? ''}`)}
      onChange={(e, value, maskedValue) => onChange(value)}
      defaultValue={parseFloat(value === '' ? 0 : value)}
      max={Number.MAX_SAFE_INTEGER}
    />
  )
}
