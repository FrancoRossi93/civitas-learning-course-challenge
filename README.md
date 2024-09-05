This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Course assignment challenge

Develop simple Web application, in any language of your choosing, which manages "Course" records:
- The application should manage the following information about a Course: id, subject, courseNumber, description. All fields other than id are strings
- There should be a simple UI/UX to add/remove courses, search courses, and show list of current courses. This does not have to be fancy as we are not looking for a UI Designer.
- The application should store data in an external database or another data storage system.

Features:
- The application should allow user to search for a course by description, with partial matches like "Bio" would find "Introduction to Biology"
- The application should support deleting a Course
- The application should support inserting a new Course
- courseNumber must be formatted as a three-digit, zero-padded integer like "033". Adding records which are not three-digit numbers results in an validation message to the user
- The application should prevent inserting duplicate courses, where subject and number must be unique

Addtional Information:
- The application must be started with minimal setup using readily available libraries (e.g. `npm start` for Node.js) and sufficiently described in a README.md
- The application must be complete and sent as a zipped package over email or a github link
- The application will only be tested in Google Chrome

Example Course records:
1, "BIO", 101, "Introduction to Biology"
2, "MAT", 045, "Business Statistics"

Suggestions:
- Use an API to manage data and connect to the API from a front-end, Javascript application
- Show that tests have been used to validate behavior
- Runnable via Docker or Kubernetes (optional)

