# FateFlix Frontend

Astro + React frontend for the FateFlix Cinematic Survey application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file (copy from `.env.example`):
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your values:
- `PUBLIC_API_BASE`: Your Railway backend URL (e.g., `https://myreading.fateflix.app`)
- `PUBLIC_GOOGLE_MAPS_KEY`: Your Google Maps API key

## Development

```bash
npm run dev
```

Starts the development server on `http://localhost:4321`

## Build

```bash
npm run build
```

Builds the production-ready static site to `dist/`

## Preview

```bash
npm run preview
```

Preview the production build locally

## Deployment

This project is designed to be deployed on Vercel.

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `PUBLIC_API_BASE`: Your Railway backend URL
   - `PUBLIC_GOOGLE_MAPS_KEY`: Your Google Maps API key
3. Vercel will auto-detect Astro and deploy automatically

## Architecture

- **Framework**: Astro with React integration
- **Styling**: Tailwind CSS

## Configuration

### QR Code Share URL
The QR code shown at the end of the survey can be configured to point to a specific URL.

1.  Open `src/config/surveyData.js`
2.  Find the item with `id: "share_qr"`
3.  Update the `shareUrl` property:

```javascript
{
  id: "share_qr",
  type: "qr_share",
  text: "Would you share this quiz with your friends?",
  subtitle: "...",
  shareUrl: "https://your-custom-url.com" // Update this
}
```

If `shareUrl` is omitted, it defaults to the current site origin with `?source=qr_share`.
- **Backend**: Separate API server on Railway
- **API Communication**: Uses `PUBLIC_API_BASE` environment variable to connect to backend

## Important Notes

- All environment variables must be prefixed with `PUBLIC_` to be accessible in the browser
- The frontend only contains `survey-logo.svg` - all other assets (Blue Planet, etc.) are served by the backend
- API calls are made to the backend using the `PUBLIC_API_BASE` URL

