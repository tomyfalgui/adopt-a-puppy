'use client'

import { useState, useEffect } from 'react'
import PuppyDisplay from '../components/Puppy'
import { Puppy } from '@/types/puppy'
import FilterOptions from '../components/FilterOptions'
import { SelectedFilter } from '@/types/filterOption'

export default function Home() {
  const [originalPuppies, setOriginalPuppies] = useState<Puppy[]>([])
  const [filteredPuppies, setFilteredPuppies] = useState<Puppy[]>([])
  useEffect(() => {
    fetch('http://localhost:5555/api/puppy')
      .then(res => res.json())
      .then(data => {
        setOriginalPuppies(data)
        setFilteredPuppies(data)
      })
  }, [])

  const handleFilterChange = (selectedFilters: Record<string, any>) => {
    const { breed, age, gender, size } = selectedFilters

    let filteredPuppies = [...originalPuppies]

    if (!breed.includes('All')) {
      filteredPuppies = filteredPuppies.filter(p => p.breed === breed)
    }
    if (!age.includes('All')) {
      filteredPuppies = filteredPuppies.filter(p => p.age === age)
    }
    if (!gender.includes('All')) {
      filteredPuppies = filteredPuppies.filter(p => p.gender === gender)
    }
    if (!size.includes('All')) {
      filteredPuppies = filteredPuppies.filter(p => p.size === size)
    }

    setFilteredPuppies(filteredPuppies)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl mb-10">Adopt A Puppy</h1>

      <FilterOptions onFilterChange={handleFilterChange} />

      {filteredPuppies && filteredPuppies.length > 0 ? (
        <ul className="flex flex-wrap">
          {filteredPuppies.map(({ name, photoUrl, breed }, idx) => {
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
      ) : (
        <p>There are no puppies :((</p>
      )}
    </main>
  )
}
