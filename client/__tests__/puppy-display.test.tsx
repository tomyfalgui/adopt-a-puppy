import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { puppyList } from '../testdata/puppy'
import Home from '../app/page'

const server = setupServer(
  rest.get('http://localhost:5555/api/puppy', (req, res, ctx) => {
    return res(ctx.json(puppyList))
  })
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
