import { useState, useEffect } from 'react'
import { FilterOptionProp, SelectedFilter } from '@/types/filterOption'

function FilterOption({ label, options, onChange }: FilterOptionProp) {
  return (
    <label>
      {label}
      <select onChange={e => onChange(e.target.value)}>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}
export default function FilterOptions({
  onFilterChange,
}: {
  onFilterChange: (newFilters: Record<string, any>) => void
}) {
  const [filterOptions, setFilterOptions] = useState<{
    [index: string]: string[]
  }>({
    breeds: [],
    ages: [],
    sizes: [],
    genders: [],
  })

  useEffect(() => {
    fetch('http://localhost:5555/api/puppy/filter-options')
      .then(res => res.json())
      .then(data => {
        setFilterOptions(data)
      })
  }, [])

  const [selectedFilter, setSelectedFilters] = useState<Record<string, any>>({
    breed: 'All breeds',
    age: 'All ages',
    gender: 'All genders',
    size: 'All sizes',
  })

  const filterMapping = [
    { label: 'Breed', dataKey: 'breeds', stateKey: 'breed' },
    { label: 'Age', dataKey: 'ages', stateKey: 'age' },
    { label: 'Size', dataKey: 'sizes', stateKey: 'size' },
    { label: 'Gender', dataKey: 'genders', stateKey: 'gender' },
  ]

  const filterOnChange = (stateKey: string) => (targetValue: string) => {
    const newFilters = { ...selectedFilter }
    newFilters[stateKey] = targetValue
    onFilterChange(newFilters)
    setSelectedFilters(newFilters)
  }

  return (
    <>
      {filterMapping.map(({ label, stateKey, dataKey }) => (
        <FilterOption
          label={label}
          onChange={filterOnChange(stateKey)}
          options={filterOptions[dataKey]}
        />
      ))}
    </>
  )
}
