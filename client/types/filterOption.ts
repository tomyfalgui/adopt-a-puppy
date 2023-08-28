export type FilterOptionProp = {
  label: string
  onChange: (val: string) => void
  options: any[]
}

export interface SelectedFilter {
  breed: string
  age: string
  size: string
  gender: string
}
