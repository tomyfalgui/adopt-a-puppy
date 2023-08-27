import express from 'express';
import cors from 'cors'
import appRouter from './routes'

function startServer({ port = 5555  } = {}) {
    const app = express()
    app.use(cors())
    app.use(express.json())

    app.use('/api', appRouter)

    return new Promise(resolve => {
        const server = app.listen(port, () => {
            console.log(`Listening on port ${port}`)
            const originalClose = server.close.bind(server)
            // @ts-ignore wrap original close function inside a function
            // for reusability
            server.close = () => {
                return new Promise(resolveClose => {
                    originalClose(resolveClose)
                })
            }
            resolve(server)
        })
    })

}

export default startServer