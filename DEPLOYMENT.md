# Deployment Guide

## Production Build

### Build for Production

```bash
npm run build
```

This will create an optimized production build in the `.next` directory.

### Start Production Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Deployment Platforms

### Vercel (Recommended)

Vercel is the easiest deployment option for Next.js apps:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository at [vercel.com](https://vercel.com) for automatic deployments.

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

Add a `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t facecard-editor .
docker run -p 3000:3000 facecard-editor
```

### Static Export (Optional)

If you want to deploy as static HTML (note: some features may be limited):

Update `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

Then build:

```bash
npm run build
```

The static files will be in the `out` directory.

## Environment Variables

Currently, the app doesn't require environment variables. If you add features that need them (like API keys), create a `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Performance Optimization

### Recommended Next.js Optimizations

1. **Image Optimization**: Already enabled by default
2. **Font Optimization**: Inter font is optimized via `next/font`
3. **Code Splitting**: Automatic with Next.js
4. **Compression**: Enable gzip/brotli in your hosting platform

### CDN Configuration

For static assets, configure your CDN to cache:
- `/_next/static/*` - Immutable, cache indefinitely
- `/public/*` - Cache with appropriate TTL

## Security Checklist

- [ ] Enable HTTPS in production
- [ ] Set appropriate CORS headers
- [ ] Add CSP (Content Security Policy) headers
- [ ] Enable rate limiting for exports
- [ ] Add error tracking (Sentry, etc.)

## Monitoring

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
2. **Google Analytics** for usage tracking
3. **Sentry** for error tracking
4. **LogRocket** for session replay

### Adding Analytics

Install:

```bash
npm install @vercel/analytics
```

Update `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Post-Deployment Checklist

- [ ] Test all functionality in production
- [ ] Verify export features work
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Check page load performance (Lighthouse)
- [ ] Verify localStorage persistence
- [ ] Test avatar upload/crop
- [ ] Verify all view modes work
- [ ] Check console for errors

## Rollback Plan

If issues occur:

1. **Vercel**: Use the Deployments tab to rollback
2. **Manual**: Keep the previous `.next` build
3. **Docker**: Tag images by version

## Support

For issues during deployment:
- Check build logs for errors
- Verify Node.js version (18+)
- Ensure all dependencies installed
- Check browser console for client-side errors

## Updates and Maintenance

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update major versions
npm install package@latest
```

### Database/Storage (Future)

Currently uses localStorage. For production at scale, consider:
- Add database for user accounts
- Cloud storage for avatar images
- Redis for session management

## Cost Estimates

### Vercel (Free Tier)
- Hobby plan: **Free** for personal projects
- Pro plan: **$20/month** for commercial use

### Netlify (Free Tier)
- Starter plan: **Free** (100GB bandwidth)
- Pro plan: **$19/month**

### Self-Hosted
- VPS (DigitalOcean): **$4-12/month**
- Storage: Minimal (~1GB)
- Bandwidth: ~10GB/month for moderate traffic

## Scaling Considerations

For high traffic:
1. Enable CDN caching
2. Add database for persistent storage
3. Implement server-side rendering cache
4. Use image CDN for avatars
5. Add Redis for session storage
6. Consider serverless functions for exports

---

**Your app is production-ready!** 🚀

Choose a deployment platform above and follow their specific guide.

