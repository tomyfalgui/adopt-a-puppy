import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { puppyList } from '../testdata/puppy'
import Home from '../app/page'
import exp from 'constants'

const server = setupServer(
  rest.get('http://localhost:5555/api/puppy', (req, res, ctx) => {
    return res(ctx.json(puppyList))
  }),
  rest.get(
    'http://localhost:5555/api/puppy/filter-options',
    (req, res, ctx) => {
      return res(
        ctx.json({
          breeds: [
            'Jack Russell',
            'Collie cross',
            'Labrador',
            'Springer Spaniel',
          ],
          ages: [1, 2, 3],
          genders: ['male', 'female'],
          sizes: ['small', 'medium', 'large'],
        })
      )
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('puppy rendering', () => {
  test('Home should have h1 header', async () => {
    render(<Home />)

    await screen.findByRole('heading')

    expect(screen.getByRole('heading')).toHaveTextContent(/adopt a puppy/i)
  })

  test('loads and displays puppies', async () => {
    render(<Home />)

    const puppies = await screen.findAllByRole('listitem')
    puppies.forEach((puppy, index) => {
      const puppyName = puppyList[index].name
      const puppyNameEl = screen.getByText(puppyName)

      expect(puppy).toContainElement(puppyNameEl)
    })
  })
})

describe('filter options', () => {
  test('should fetch and render specific breed options', async () => {
    render(<Home />)

    const selectBreed = screen.getByRole('combobox', {
      name: /select a breed/i,
    })
    const breedOptions = await within(selectBreed).findAllByRole('option')
    const breedOptionTexts = breedOptions.map(opt => opt.textContent)

    const expectedBreeds = [
      'Jack Russell',
      'Collie cross',
      'Labrador',
      'Springer Spaniel',
    ]
    expectedBreeds.forEach(opt => {
      expect(breedOptionTexts).toContain(opt)
    })
  })
})
