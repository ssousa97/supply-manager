import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function DateInput({
  value,
  onChange,
}: {
  value: Date
  onChange: (value: any) => void
}) {
  return (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date)}
    />
  )
}
