import 'dotenv/config'
import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { errors, isCelebrateError } from 'celebrate'
import { Prisma } from './generated/prisma/index.js'

import announcementsRouter from './src/routes/announcements.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Announcements API',
      version: '1.0.0',
      description: 'RESTful API for announcements board homework',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/announcements', announcementsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use(errors())

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res.status(400).json({ message: err.message })
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    return res.status(404).json({ message: 'Announcement not found' })
  }

  console.error(err)
  return res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`)
})
