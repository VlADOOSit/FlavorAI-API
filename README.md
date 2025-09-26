# FlavorAI-API

For start

Backend:
```
git clone https://github.com/VlADOOSit/FlavorAI-API.git
```
```
npm install
```
Create .env file in the root like this:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/recipesdb?schema=public"
PORT=3001
JWT_ACCESS_SECRET="receipte_secret"
JWT_REFRESH_SECRET="receipte_secret_refresh"
ACCESS_EXPIRE="15m"
REFRESH_EXPIRE="7d"
```
For starting DB in Docker:
```
docker run --name recipes_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=recipesdb -p 5432:5432 -d postgres:15
```
For migration:
```
npx prisma migrate dev --name init
npx prisma generate
```
For start:
```
npm run dev
```

Fontend:
```
git clone https://github.com/VlADOOSit/flavorai-react.git
```
For start:
```
npm start
```

This project is a full-stack web application for managing and rating cooking recipes.
It is built with Node.js, Express, Prisma, and PostgreSQL on the backend, and React, TypeScript, and TailwindCSS on the frontend.

Key Features

Authentication middleware – basic user authentication with protected routes.

Recipe management – create, view, and search recipes.

Rating system – users can rate recipes (1–5 stars) and see the average score.

Frontend UI – responsive React + TailwindCSS interface with navigation header, recipe list, recipe details, and rating functionality.

I tried to implement all the required functionality. The frontend is kept quite simple due to limited time, but I focused on covering the main features.
