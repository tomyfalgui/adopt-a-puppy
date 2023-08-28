import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { puppyList } from '../testdata/puppy'
import Home from '../app/page'

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
            'All breeds',
            'Jack Russell',
            'Collie cross',
            'Labrador',
            'Springer Spaniel',
          ],
          ages: ['All ages', '1', '2', '3'],
          genders: ['All genders', 'male', 'female'],
          sizes: ['All sizes', 'small', 'medium', 'large'],
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

describe('filter options fetching and rendering', () => {
  test('should fetch and render specific breed options', async () => {
    render(<Home />)

    const selectBreed = screen.getByRole('combobox', {
      name: /breed/i,
    })
    const breedOptions = await within(selectBreed).findAllByRole('option')
    const breedOptionTexts = breedOptions.map(opt => opt.textContent)

    const expectedBreeds = [
      'All breeds',
      'Jack Russell',
      'Collie cross',
      'Labrador',
      'Springer Spaniel',
    ]
    expectedBreeds.forEach(opt => {
      expect(breedOptionTexts).toContain(opt)
    })
  })
  test('should fetch and render specific gender options', async () => {
    render(<Home />)

    const selectGender = screen.getByRole('combobox', {
      name: /gender/i,
    })
    const genderOptions = await within(selectGender).findAllByRole('option')
    const genderOptionTexts = genderOptions.map(opt => opt.textContent)

    const expectedGenders = ['All genders', 'male', 'female']
    expectedGenders.forEach(opt => {
      expect(genderOptionTexts).toContain(opt)
    })
  })
  test('should fetch and render specific size options', async () => {
    render(<Home />)

    const selectSize = screen.getByRole('combobox', {
      name: /size/i,
    })
    const sizeOptions = await within(selectSize).findAllByRole('option')
    const sizeOptionTexts = sizeOptions.map(opt => opt.textContent)

    const expectedSizes = ['All sizes', 'small', 'medium', 'large']
    expectedSizes.forEach(opt => {
      expect(sizeOptionTexts).toContain(opt)
    })
  })
  test('should fetch and render specific age options', async () => {
    render(<Home />)

    const selectAge = screen.getByRole('combobox', {
      name: /age/i,
    })
    const ageOptions = await within(selectAge).findAllByRole('option')
    const ageOptionTexts = ageOptions.map(opt => opt.textContent)

    const expectedAges = ['All ages', '1', '2', '3']
    expectedAges.forEach(opt => {
      expect(ageOptionTexts).toContain(opt)
    })
  })
})

// for the purpose of the exercise
// filtering is done on the frontend
describe('filter options interaction', () => {
  test('single option: puppy display should change based on selected filter options', async () => {
    // arrange
    render(<Home />)
    const user = userEvent.setup()
    const selectBreed = screen.getByRole('combobox', {
      name: /breed/i,
    })

    // act
    await within(selectBreed).findAllByRole('option')
    await user.selectOptions(selectBreed, 'Jack Russell')

    // assert
    const existingPuppies = await screen.findAllByRole('listitem')
    const samuel = screen.getByText(/samuel/i)
    expect(existingPuppies).toHaveLength(1)
    expect(samuel).toBeInTheDocument()
    expect(existingPuppies[0]).toContainElement(samuel)
  })
  test('multiple options: puppy display should change based on selected filter options', async () => {
    // arrange
    render(<Home />)
    const user = userEvent.setup()
    const selectBreed = screen.getByRole('combobox', {
      name: /breed/i,
    })
    const selectGender = screen.getByRole('combobox', {
      name: /gender/i,
    })

    // act
    await within(selectBreed).findAllByRole('option')
    await user.selectOptions(selectBreed, 'Labrador')
    await user.selectOptions(selectGender, 'female')
    const filteredBreedGenderPups = await screen.findAllByRole('listitem')

    const janna = screen.getByText(/janna/i)

    await within(selectGender).findAllByRole('option')
    expect(filteredBreedGenderPups).toHaveLength(1)
    expect(janna).toBeInTheDocument()
    expect(filteredBreedGenderPups[0]).toContainElement(janna)
  })
})
