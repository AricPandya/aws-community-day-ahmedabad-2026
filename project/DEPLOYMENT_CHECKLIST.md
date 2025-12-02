# Deployment Checklist - AWS Community Day 2026

## Pre-Deployment Setup (Complete These First)

### Configuration
- [ ] Update `EVENT_INFO` in `/src/lib/seo.ts` with correct details
- [ ] Set up `.env` file with Supabase credentials
- [ ] Configure Google Analytics ID in `index.html`
- [ ] Set up Stripe keys if using Stripe checkout
- [ ] Create Formspree form for contact form

### Content
- [ ] Add speaker photos and upload to CDN
- [ ] Add sponsor logos and upload to CDN
- [ ] Create event banner image (1200x630px)
- [ ] Write mission statement for About page
- [ ] Create organizer bios
- [ ] Populate FAQ database

### Database
- [ ] Verify all Supabase tables exist
- [ ] Check RLS policies are enabled
- [ ] Insert sample data (if not already present)
- [ ] Test form submissions end-to-end
- [ ] Verify data appears on frontend

### Integrations
- [ ] Set up Zapier workflows for:
  - Volunteer confirmations
  - Newsletter subscription
  - Contact form routing
- [ ] Test Mailchimp integration
- [ ] Test Google Analytics tracking
- [ ] Verify Stripe webhook endpoints

### Testing
- [ ] Test all pages load correctly
- [ ] Test all forms submit successfully
- [ ] Test responsive design on mobile
- [ ] Test keyboard navigation (Tab key)
- [ ] Test screen reader (NVDA or JAWS)
- [ ] Verify all images load
- [ ] Check all links work
- [ ] Test countdown timer accuracy

## Pre-Production Deployment

### Performance
- [ ] Run Lighthouse audit (target: 85+)
- [ ] Test page load times
- [ ] Check Core Web Vitals
- [ ] Verify images are optimized
- [ ] Check bundle size

### SEO
- [ ] Verify meta tags on all pages
- [ ] Check JSON-LD schema with validator
- [ ] Test Open Graph tags on social platforms
- [ ] Create and validate sitemap.xml
- [ ] Create robots.txt
- [ ] Test canonical URLs

### Security
- [ ] Verify no secrets in code
- [ ] Check environment variables are used
- [ ] Test HTTPS on all pages
- [ ] Verify CORS headers if needed
- [ ] Test SQL injection prevention

### Accessibility
- [ ] Run WAVE accessibility audit
- [ ] Test with Axe DevTools
- [ ] Verify color contrast (4.5:1 minimum)
- [ ] Test with keyboard navigation
- [ ] Test with screen reader
- [ ] Check for WCAG AA compliance

## Staging Deployment

1. Build production bundle:
   ```bash
   npm run build
   npm run preview
   ```

2. Test on staging environment:
   - [ ] All pages load
   - [ ] Forms work correctly
   - [ ] Database queries return data
   - [ ] Analytics fire events
   - [ ] Email notifications send

3. Have team review:
   - [ ] Organizers approve content
   - [ ] Sponsors verify logos display correctly
   - [ ] Speakers confirm bios are accurate
   - [ ] Marketing reviews for brand consistency

4. Fix any issues found

## Production Deployment

### Pre-Launch (24 hours before)

1. Final content verification:
   - [ ] All speaker info correct
   - [ ] All sponsor logos present
   - [ ] All page copy proofread
   - [ ] Contact info updated

2. Database backup:
   ```sql
   -- Backup command varies by service
   ```

3. Final security check:
   - [ ] HTTPS working
   - [ ] No console errors
   - [ ] No broken links
   - [ ] No missing images

### Launch Day

1. Deploy to production:
   ```bash
   # Vercel
   vercel --prod

   # Or Netlify
   netlify deploy --prod --dir=dist
   ```

2. Smoke tests (first hour):
   - [ ] Home page loads
   - [ ] Can access all major pages
   - [ ] Forms submit without errors
   - [ ] Images load correctly
   - [ ] No console errors

3. Monitoring setup:
   - [ ] Google Analytics tracking
   - [ ] Error tracking active (Sentry)
   - [ ] Uptime monitoring active
   - [ ] Email notification alerts working

4. Team notifications:
   - [ ] Notify organizers site is live
   - [ ] Send to sponsors
   - [ ] Announce on social media
   - [ ] Add to AWS UserGroup website

### Post-Launch (First Week)

Daily:
- [ ] Check error logs
- [ ] Monitor Google Analytics
- [ ] Review form submissions
- [ ] Check email delivery

Weekly:
- [ ] Review volunteer applications
- [ ] Monitor website performance
- [ ] Check social media mentions
- [ ] Respond to form inquiries

## Rollback Plan

If critical issues occur:

1. **Immediate action** (< 1 hour):
   - Revert to previous build:
     ```bash
     # Vercel
     vercel rollback

     # Or Netlify
     netlify deploy --prod --dir=dist-previous
     ```

2. **Notify stakeholders**:
   - Email organizers and sponsors
   - Post status on social media
   - Update website status page

3. **Root cause analysis**:
   - Check error logs
   - Review recent changes
   - Identify breaking issue

4. **Fix and redeploy**:
   - Fix the issue locally
   - Test thoroughly
   - Redeploy with caution

## Post-Event Tasks

### Immediate (Week of event)
- [ ] Collect attendee feedback
- [ ] Thank speakers and sponsors
- [ ] Process refund requests
- [ ] Update volunteer recognition page

### Short-term (1-2 weeks)
- [ ] Publish event photos
- [ ] Post speaker slides (if available)
- [ ] Create event recap blog post
- [ ] Share attendee statistics

### Medium-term (1-2 months)
- [ ] Archive event page
- [ ] Redirect old URLs if needed
- [ ] Plan next event
- [ ] Update sponsor testimonials

## Monitoring & Maintenance

### Ongoing
- Monitor website uptime
- Review error logs weekly
- Check form submissions
- Monitor database usage
- Update content as needed

### Regular
- Monthly security checks
- Quarterly content audit
- Semi-annual accessibility review
- Annual server maintenance

### Updates
- Keep dependencies updated
- Apply security patches promptly
- Update content before event date
- Refresh sponsor logos/info

## Emergency Contacts

Set up during deployment:
- [ ] Technical support team
- [ ] Event organizers
- [ ] Server administrator
- [ ] Database administrator
- [ ] Vendor support contacts

## Deployment Success Indicators

✅ Website is live and accessible
✅ All pages load without errors
✅ Forms submit successfully
✅ Database is populated with content
✅ Analytics tracking fires correctly
✅ Email notifications send
✅ Performance metrics are acceptable
✅ SEO is properly configured
✅ Accessibility standards met
✅ Team is satisfied with launch

## Notes

- Keep this checklist updated after each deployment
- Document any issues and resolutions
- Add new items as they arise
- Review and update quarterly

---

**Last Updated:** November 2025
**Event Date:** December 13, 2026
**Contact:** contact@awscommunityday2026.com
