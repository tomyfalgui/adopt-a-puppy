import _, { uniq } from 'lodash'

export type Puppy = {
  name: string
  age: number
  gender: string
  isVaccinated: boolean
  isNeutered: boolean
  size: string
  breed: string
  traits: string[]
  photoUrl: string
}

// test data
export let puppies: Puppy[] = [
  {
    name: 'Samuel',
    age: 1,
    gender: 'male',
    isVaccinated: true,
    isNeutered: true,
    size: 'small',
    breed: 'Jack Russell',
    traits: ['Quiet', 'Great with children'],
    photoUrl:
      'https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
  {
    name: 'Tillie',
    age: 2,
    gender: 'female',
    isVaccinated: true,
    isNeutered: true,
    size: 'medium',
    breed: 'Collie cross',
    traits: ['Affectionate', 'Loves to play'],
    photoUrl:
      'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Barnaby',
    age: 1,
    gender: 'male',
    isVaccinated: false,
    isNeutered: false,
    size: 'large',
    breed: 'Labrador',
    traits: ['Very active', 'Big appetite'],
    photoUrl:
      'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Emily',
    age: 3,
    gender: 'female',
    isVaccinated: false,
    isNeutered: true,
    size: 'small',
    breed: 'Springer Spaniel',
    traits: ['Friendly', 'Great around other dogs'],
    photoUrl:
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
  },
]

// methods below
async function query(queryObj: {}) {
  return _.filter(puppies, queryObj)
}

function buildFilterOptions() {
  const extractUniqueValues = (
    puppies: Puppy[],
    attribute: 'breed' | 'size' | 'age' | 'gender'
  ) => {
    const uniqueValues = new Set()
    puppies.forEach(puppy => {
      uniqueValues.add(puppy[attribute])
    })
    return Array.from(uniqueValues)
  }

  const uniqueBreeds = extractUniqueValues(puppies, 'breed')
  const uniqueAges = extractUniqueValues(puppies, 'age')
  const uniqueSizes = extractUniqueValues(puppies, 'size')
  const uniqueGenders = extractUniqueValues(puppies, 'gender')

  return {
    breeds: ['All breeds', ...uniqueBreeds],
    ages: ['All ages', ...uniqueAges],
    sizes: ['All sizes', ...uniqueSizes],
    genders: ['All genders', ...uniqueGenders],
  }
}

export { query, buildFilterOptions }
