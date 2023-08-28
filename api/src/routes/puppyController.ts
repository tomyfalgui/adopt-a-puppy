import * as puppyDB from '@/db/puppy'
import type { Request, Response } from 'express'
import { buildFilterOptions } from '@/db/puppy'

async function getPuppyList(req: Request, res: Response) {
  // empty obj query to display all possible puppies
  const puppies = await puppyDB.query({})
  res.json(puppies)
}

async function getFilterOptions(req: Request, res: Response) {
  const filterOptions = buildFilterOptions()
  res.json(filterOptions)
}

export { getPuppyList, getFilterOptions }
