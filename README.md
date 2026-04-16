# artrack 💿

A pixel-art vinyl room that displays your record collection on shelves. Click any record to read the review and rating. Filter by genre, rating, or sort by date/artist/title.

## Setup

```bash
npm install
npm run dev
```

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com) — it auto-detects Vite and deploys in ~60 seconds.

## Adding records

Edit the `RECORDS` array in `src/App.jsx`. Each record needs:

```js
{
  id: 13,
  title: "Album Name",
  artist: "Artist",
  genre: "Genre",
  rating: 4,          // 1-5
  year: 2024,
  review: "Your review here.",
  color: "#e84330",    // sleeve color
  accent: "#ff6b5a",   // sleeve highlight
  cover: "🎵",         // emoji placeholder (swap for image later)
  dateListened: "2026-04-16"
}
```
