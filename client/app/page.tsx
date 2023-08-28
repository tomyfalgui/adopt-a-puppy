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
  const [breed, setBreed] = useState('All breeds')
  const [gender, setGender] = useState('All genders')
  const [age, setAge] = useState('All ages')
  const [size, setSize] = useState('All sizes')

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
        <select onChange={e => setBreed(e.target.value)}>
          {filterOptions?.breeds.map(opt => {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            )
          })}
        </select>
      </label>

      <label>
        Gender
        <select onChange={e => setGender(e.target.value)}>
          {filterOptions?.genders.map(opt => {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            )
          })}
        </select>
      </label>

      <label>
        Size
        <select onChange={e => setSize(e.target.value)}>
          {filterOptions?.sizes.map(opt => {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            )
          })}
        </select>
      </label>

      <label>
        Age
        <select onChange={e => setAge(e.target.value)}>
          {filterOptions?.ages.map(opt => {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            )
          })}
        </select>
      </label>

      {data && data.length > 0 ? (
        <ul className="flex flex-wrap">
          {data
            .filter(puppy =>
              breed.includes('All') ? true : puppy.breed === breed
            )
            .filter(puppy =>
              gender.includes('All') ? true : puppy.gender === gender
            )
            .filter(puppy => (age.includes('All') ? true : puppy.age === +age))
            .filter(puppy =>
              size.includes('All') ? true : puppy.size === size
            )
            .map(({ name, photoUrl, breed }, idx) => {
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
