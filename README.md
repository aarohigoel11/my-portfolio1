# Aarohi Goel portfolio

The original single-page portfolio rebuilt as a Next.js app, with its page content and visual styling preserved. Image data embedded in the original HTML is stored as regular files in `public/assets`.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build for production

```bash
npm run build
npm start
```

The main route is in `app/page.tsx`; the client-side behavior is in `app/portfolio-client.tsx`; global styles are in `app/globals.css`.
