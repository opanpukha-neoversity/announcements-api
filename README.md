# Announcements API

RESTful API for announcements board homework.

## Setup

```bash
npm install
npm run prisma:migrate
npm run seed
npm run dev
```

Server: http://localhost:3000
Swagger: http://localhost:3000/api-docs

## Endpoints

- `GET /announcements`
- `GET /announcements/:id`
- `POST /announcements`
- `PATCH /announcements/:id`
- `DELETE /announcements/:id`
