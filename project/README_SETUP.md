# AWS Community Day 2026 - Setup & Integration Guide

A production-ready, fully functional React + Supabase website for AWS Community Day 2026. Mobile-first responsive design with CMS collections, forms, and SEO optimization.

## Quick Start

### 1. Environment Setup

The project uses Supabase for the database. Your credentials are already in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

The database schema is already created with migrations:
- Tables: speakers, sponsors, ticket_tiers, faqs, volunteers, newsletter_subscribers, user_profiles, badges
- All tables have Row Level Security (RLS) enabled
- Public read access for speakers, sponsors, FAQs, ticket tiers

### 3. Running the Project

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run typecheck # Check TypeScript
```

## Key Features

### Pages
- **Home**: Hero with countdown timer, featured speakers & sponsors
- **Speakers**: CMS-driven speaker list with detail pages
- **Sponsors**: Sponsor carousel by tier (Platinum, Gold, Silver, Bronze)
- **Tickets**: Pricing table with refund policy
- **Venue**: Location, map, parking, accessibility info
- **Volunteers**: Application form with automated submission
- **FAQ**: Searchable, categorized FAQ with accordion UI
- **Badge**: Digital badge generator with canvas rendering
- **Contact**: Contact form with multiple departments
- **Policies**: Code of Conduct, Privacy, Accessibility

### CMS Collections (Supabase)

#### Speakers
```
- name (text)
- title (text)
- organization (text)
- talk_title (text)
- abstract (text)
- track (text)
- bio (text)
- photo_url (text)
- linkedin_url, twitter_url, github_url (text)
- talk_length_minutes (integer)
- sort_order (integer)
```

#### Sponsors
```
- company_name (text)
- tier (enum: Platinum|Gold|Silver|Bronze)
- logo_url (text)
- website_url (text)
- description (text)
- contact_email (text)
- benefits (array)
- sort_order (integer)
```

#### Ticket Tiers
```
- name (text): Student, Regular, VIP
- price (decimal)
- currency (text): INR
- description (text)
- quantity_limit (integer)
- sold_count (integer)
- includes (array): List of benefits
- sort_order (integer)
```

#### FAQs
```
- question (text)
- answer (text)
- category (text)
- sort_order (integer)
```

#### Volunteers
```
- name (text)
- email (text)
- phone (text)
- role (text)
- experience_level (text)
- availability (array)
- motivation (text)
- confirmation_sent (boolean)
```

### Newsletter & Forms

Newsletter subscribers are automatically saved to the `newsletter_subscribers` table. To integrate with Mailchimp:

1. Create a Mailchimp account and get your API key
2. Set up a Zapier integration:
   - Trigger: Webhook (Supabase inserts to newsletter_subscribers)
   - Action: Mailchimp - Add subscriber
   - Map fields: email, name

### Ticket Checkout Integration

#### Option 1: Stripe Embedded Checkout
```javascript
// In /src/pages/Tickets.tsx, replace button with:
<button onClick={() => {
  const stripe = await loadStripe('YOUR_STRIPE_KEY');
  stripe.redirectToCheckout({ sessionId: 'your_session_id' });
}}>
  Purchase Ticket
</button>
```

#### Option 2: Third-party Ticket Provider
Add a link or embed:
```html
<a href="https://your-ticketing-provider.com/event/aws-day-2026">
  Buy Tickets
</a>
```

### Form Integrations

#### Contact Form
Currently setup for email submission. To enable:
1. Sign up at formspree.io
2. Create a form and get your Form ID
3. In `/src/pages/Contact.tsx`, replace `YOUR_FORM_ID` with your actual ID

#### Volunteer Confirmations via Zapier
1. Create a Zapier workflow triggered by `volunteers` table inserts
2. Use Gmail or SMTP to send confirmation emails
3. Update `confirmation_sent` flag when email is sent

### Google Analytics & Tracking

Add GA4 to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## SEO Configuration

### Meta Tags & Open Graph
All pages use the `SEOHead` component. Default values are configured in `/src/lib/seo.ts`.

Update the `EVENT_INFO` object with your details:
```typescript
export const EVENT_INFO = {
  name: 'AWS Community Day 2026',
  date: '2026-12-13',
  location: 'Parul University, Vadodara',
  website: 'https://yourdomain.com',
  // ...
};
```

### JSON-LD Event Schema
Automatically added to home page. To customize, edit `/src/lib/seo.ts` `eventSchema` object.

### Sitemap & Robots.txt
Create these files in `public/`:

**public/sitemap.xml**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/speakers</loc>
    <priority>0.8</priority>
  </url>
  <!-- Add all pages -->
</urlset>
```

**public/robots.txt**:
```
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://yourdomain.com/sitemap.xml
```

## Content Management

### Adding Speakers
1. Go to Supabase > speakers table
2. Add new row with speaker details
3. Upload speaker photo to a CDN and paste URL in `photo_url` field
4. Set `sort_order` to control display order

### Adding Sponsors
1. Go to Supabase > sponsors table
2. Upload logo to CDN, paste URL in `logo_url`
3. Set tier: Platinum (1 col), Gold (2 cols), Silver (3 cols), Bronze (4 cols)
4. Sponsors automatically display grouped by tier

### Adding FAQs
1. Go to Supabase > faqs table
2. Add question, answer, and category
3. Accordion automatically expands/collapses

### Adding Ticket Tiers
1. Go to Supabase > ticket_tiers table
2. Set pricing, benefits array, and quantity limit
3. Tier with `sort_order: 1` displays as "Most Popular" (featured with ring border)

## Image Optimization

All image URLs should use CDN (Cloudinary, Imgix, or Supabase Storage):

```html
<!-- Use responsive srcset for faster loading -->
<img
  src="https://cdn.example.com/speaker.webp?w=400"
  srcset="https://cdn.example.com/speaker.webp?w=400 1x,
          https://cdn.example.com/speaker.webp?w=800 2x"
  alt="Speaker name"
  loading="lazy"
/>
```

### Recommended Image Sizes
- Speaker photos: 600x600px (WebP/AVIF)
- Sponsor logos: 400x300px (PNG with transparency)
- Featured images: 1200x630px (WebP/AVIF)

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

Automatically configures:
- Environment variables
- Auto-deploys from git
- Automatic HTTPS
- CDN edge caching

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

## Troubleshooting

### Database Connection Issues
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`
- Check Supabase project > API Settings > RLS policies
- Ensure public read access for data tables

### Form Submissions Not Working
- Verify Supabase RLS allows unauthenticated inserts to `volunteers`, `newsletter_subscribers`
- Check browser console for errors
- Ensure CORS headers are configured if using external services

### Image Not Loading
- Verify CDN URL is accessible and CORS enabled
- Check image dimensions match expected sizes
- Use `loading="lazy"` for offscreen images

### SEO Issues
- Verify canonical URLs in `SEOHead` component
- Check JSON-LD schema at https://schema.org/validator
- Test meta tags with Facebook/Twitter Share Debugger
- Verify sitemap.xml is valid

## Performance Tips

1. **Lazy load images**: Use `loading="lazy"` attribute
2. **Code split**: Dynamic imports for heavy pages
3. **Preconnect**: Add `<link rel="preconnect">` to external APIs
4. **Caching**: Configure browser cache for static assets
5. **CDN**: Serve images through CDN with WebP/AVIF support

## Security

- All database tables use Row Level Security (RLS)
- Sensitive operations require authentication
- Environment variables never exposed in client code
- Forms validate input server-side (if using backend)
- HTTPS required for production

## Support & Updates

Event Date: December 13, 2026
Timezone: IST (UTC+05:30)
Location: Parul University, Vadodara

For questions or updates:
- Email: contact@awscommunityday2026.com
- Twitter: @awsuserahmedabad
- LinkedIn: aws-user-group-ahmedabad
