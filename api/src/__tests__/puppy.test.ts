import axios from 'axios'
import startServer from '../start'
import { afterAll, beforeAll, describe, expect } from 'vitest'
import { puppies } from '@/db/puppy'

let server: any
let baseURL: any

beforeAll(async () => {
  server = await startServer({ port: 8000 })
  baseURL = `http://localhost:${server.address().port}/api`
})

afterAll(() => server.close())

function setup() {
  const api = axios.create({ baseURL })
  // we assume a user is authenticated
  return { api }
}

describe('puppy functions', () => {
  test('return all available puppies for adoption', async () => {
    const { api } = setup()

    const availablePuppies = await api.get('/puppy')
    expect(availablePuppies.data).toMatchObject(puppies)
  })
})

describe('filter options', () => {
  test('should return filter options', async () => {
    const { api } = setup()

    const filterOptions = (await api.get('/puppy/filter-options')).data
    expect(filterOptions).toHaveProperty('breeds')
    expect(filterOptions).toHaveProperty('ages')
    expect(filterOptions).toHaveProperty('sizes')
    expect(filterOptions).toHaveProperty('genders')
  })
})
