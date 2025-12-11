export const EVENT_INFO = {
  name: 'AWS Community Day 2026',
  date: '2026-02-28',
  startTime: '09:00:00',
  endTime: '18:00:00',
  timezone: '+05:30',
  location: 'Parul University, Vadodara',
  address: 'Parul University, Limda, Vadodara, Gujarat 391110, India',
  city: 'Vadodara',
  state: 'GJ',
  country: 'IN',
  postalCode: '391110',
  website: 'https://acdahm2026.vercel.app',
  email: 'contact@awscommunityday2026.com',
};

export const DEFAULT_KEYWORDS = [
  'acd 2026',
  'aws community day 2026 ahmedabad',
  'aws community day ahmedabad',
  'aws ahmedabad',
  'cloud computing conference',
  'aws user group ahmedabad',
  'tech conference gujarat',
].join(', ');

export const generateMetaTags = (
  title: string,
  description: string,
  image: string = `${EVENT_INFO.website}/og-image.webp`,
  url: string = EVENT_INFO.website,
  type: string = 'website'
) => {
  return {
    title: `${title} | ${EVENT_INFO.name}`,
    description,
    image,
    url,
    type,
    ogTitle: `${title} | ${EVENT_INFO.name}`,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: type,
    twitterCard: 'summary_large_image',
    twitterTitle: `${title} | ${EVENT_INFO.name}`,
    twitterDescription: description,
    twitterImage: image,
    canonical: url,
  };
};

export const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  'name': EVENT_INFO.name,
  'startDate': `${EVENT_INFO.date}T${EVENT_INFO.startTime}${EVENT_INFO.timezone}`,
  'endDate': `${EVENT_INFO.date}T${EVENT_INFO.endTime}${EVENT_INFO.timezone}`,
  'eventStatus': 'https://schema.org/EventScheduled',
  'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
  'location': {
    '@type': 'Place',
    'name': EVENT_INFO.location,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Limda',
      'addressLocality': EVENT_INFO.city,
      'addressRegion': EVENT_INFO.state,
      'postalCode': EVENT_INFO.postalCode,
      'addressCountry': EVENT_INFO.country,
    },
  },
  'image': `${EVENT_INFO.website}/og-image.webp`,
  'description': 'AWS Community Day 2026 - A full-day event for cloud enthusiasts, students, and professionals to learn about AWS and connect with the community.',
  'organizer': {
    '@type': 'Organization',
    'name': 'AWS User Group Ahmedabad',
    'url': EVENT_INFO.website,
  },
  'offers': {
    '@type': 'Offer',
    'url': `${EVENT_INFO.website}/tickets`,
    'priceCurrency': 'INR',
    'availability': 'https://schema.org/InStock',
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'AWS User Group Ahmedabad',
  'url': EVENT_INFO.website,
  'logo': `${EVENT_INFO.website}/logo.png`,
  'sameAs': [
    'https://www.linkedin.com/company/aws-user-group-ahmedabad',
    'https://twitter.com/awsuserahmedabad',
  ],
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': item.url,
  })),
});
