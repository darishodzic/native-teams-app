import { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

type SelectProps = {
  items: { value: number | string; label: string }[]
  value: number | string
  onChange: (value: any) => void
}

const Select = (props: SelectProps) => {
  const { items, value, onChange } = props

  const [open, setOpen] = useState(false)

  return (
    <DropDownPicker
      containerStyle={{ width: 100 }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={(cb: any) => onChange(cb?.())}
    />
  )
}

export default Select
