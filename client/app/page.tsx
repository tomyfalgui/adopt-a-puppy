'use client'

import { useState, useEffect } from 'react'
import PuppyDisplay from '../components/Puppy'
import { Puppy } from '@/types/puppy'

export default function Home() {
  const [data, setData] = useState<Puppy[]>([])
  const [filterOptions, setFilterOptions] = useState<{
    breeds: string[]
    ages: string[]
    genders: string[]
    sizes: string[]
  }>()

  useEffect(() => {
    fetch('http://localhost:5555/api/puppy')
      .then(res => res.json())
      .then(data => {
        setData(data)
      })

    fetch('http://localhost:5555/api/puppy/filter-options')
      .then(res => res.json())
      .then(data => {
        setFilterOptions(data)
      })
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl mb-10">Adopt A Puppy</h1>

      <label>
        Breed
        <select>
          {filterOptions?.breeds.map(opt => {
            return <option key={opt}>{opt}</option>
          })}
        </select>
      </label>

      <label>
        Gender
        <select>
          {filterOptions?.genders.map(opt => {
            return <option key={opt}>{opt}</option>
          })}
        </select>
      </label>

      <label>
        Size
        <select>
          {filterOptions?.sizes.map(opt => {
            return <option key={opt}>{opt}</option>
          })}
        </select>
      </label>

      <label>
        Age
        <select>
          {filterOptions?.ages.map(opt => {
            return <option key={opt}>{opt}</option>
          })}
        </select>
      </label>

      {data && data.length > 0 ? (
        <ul className="flex flex-wrap">
          {data.map(({ name, photoUrl, breed }, idx) => {
            return (
              <PuppyDisplay
                name={name}
                photoUrl={photoUrl}
                breed={breed}
                key={idx}
              />
            )
          })}
        </ul>
      ) : null}
    </main>
  )
}
