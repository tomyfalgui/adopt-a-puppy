import * as puppyDB from '@/db/puppy'
import type { Request, Response } from 'express'

async function getPuppyList(req: Request, res: Response) {
    // empty obj query to display all possible puppies
    const puppies = await puppyDB.query({})
    res.json(puppies)
}

export { getPuppyList }