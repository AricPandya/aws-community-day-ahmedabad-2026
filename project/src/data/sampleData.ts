import { supabase, Speaker, Sponsor, TicketTier, FAQ } from '../lib/supabase';

export const SAMPLE_SPEAKERS: Omit<Speaker, 'id'>[] = [
  {
    name: 'Anand Sharma',
    title: 'Solutions Architect',
    organization: 'AWS',
    talk_title: 'Serverless Architecture at Scale: Lessons from Production',
    abstract: 'Learn how to build and scale serverless applications in AWS. We\'ll cover Lambda, API Gateway, and best practices from real-world deployments.',
    track: 'Architecture',
    bio: 'Anand is a Solutions Architect at AWS with 12+ years of experience in cloud infrastructure. He has helped 100+ enterprises migrate to AWS.',
    photo_url: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin_url: 'https://linkedin.com/in/anand-sharma',
    twitter_url: 'https://twitter.com/anand_aws',
    github_url: '',
    talk_length_minutes: 60,
    sort_order: 1,
  },
  {
    name: 'Priya Singh',
    title: 'DevOps Lead',
    organization: 'Tech Startups Inc',
    talk_title: 'CI/CD Pipelines with AWS CodePipeline and GitOps',
    abstract: 'Explore continuous integration and deployment practices using AWS services. Implement GitOps workflows for reliable deployments.',
    track: 'DevOps',
    bio: 'Priya is a DevOps lead with expertise in cloud automation and infrastructure as code. Speaker at 10+ tech conferences.',
    photo_url: 'https://images.pexels.com/photos/3807510/pexels-photo-3807510.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin_url: 'https://linkedin.com/in/priya-singh',
    twitter_url: 'https://twitter.com/priya_devops',
    github_url: 'https://github.com/priya-singh',
    talk_length_minutes: 45,
    sort_order: 2,
  },
  {
    name: 'Rajesh Kumar',
    title: 'ML Engineer',
    organization: 'Data Labs',
    talk_title: 'Machine Learning on AWS: SageMaker in Production',
    abstract: 'Build and deploy ML models on AWS SageMaker. Learn about feature engineering, training, and serving models at scale.',
    track: 'AI/ML',
    bio: 'Rajesh specializes in machine learning and has deployed ML solutions for Fortune 500 companies using AWS services.',
    photo_url: 'https://images.pexels.com/photos/3785933/pexels-photo-3785933.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedin_url: 'https://linkedin.com/in/rajesh-kumar',
    twitter_url: '',
    github_url: 'https://github.com/rajesh-ml',
    talk_length_minutes: 50,
    sort_order: 3,
  },
];

export const SAMPLE_SPONSORS: Omit<Sponsor, 'id'>[] = [
  {
    company_name: 'AWS',
    tier: 'Platinum',
    logo_url: 'https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg?auto=compress&cs=tinysrgb&w=400',
    website_url: 'https://aws.amazon.com',
    description: 'Cloud computing platform',
    contact_email: 'contact@aws.com',
    benefits: ['Title sponsorship', 'Booth space', 'Speaking slot', 'Logo on all materials'],
    sort_order: 1,
  },
  {
    company_name: 'TechCorp',
    tier: 'Gold',
    logo_url: 'https://images.pexels.com/photos/3194520/pexels-photo-3194520.jpeg?auto=compress&cs=tinysrgb&w=400',
    website_url: 'https://techcorp.example.com',
    description: 'Enterprise software solutions',
    contact_email: 'sponsor@techcorp.com',
    benefits: ['Premium booth', 'Branded materials', 'Logo on website'],
    sort_order: 2,
  },
  {
    company_name: 'CloudSystems',
    tier: 'Gold',
    logo_url: 'https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=400',
    website_url: 'https://cloudsystems.example.com',
    description: 'Cloud infrastructure provider',
    contact_email: 'sponsor@cloudsystems.com',
    benefits: ['Booth space', 'Logo on website'],
    sort_order: 3,
  },
  {
    company_name: 'DevTools Pro',
    tier: 'Silver',
    logo_url: 'https://images.pexels.com/photos/3194522/pexels-photo-3194522.jpeg?auto=compress&cs=tinysrgb&w=400',
    website_url: 'https://devtools.example.com',
    description: 'Developer tools and platforms',
    contact_email: '',
    benefits: ['Standard booth'],
    sort_order: 4,
  },
];

export const SAMPLE_TICKETS: Omit<TicketTier, 'id'>[] = [
  {
    name: 'Student',
    price: 299,
    currency: 'INR',
    description: 'For current students with valid ID',
    quantity_limit: 200,
    sold_count: 45,
    includes: ['Access to all sessions', 'Lunch & snacks', 'Networking events', 'Digital badge'],
    sort_order: 1,
  },
  {
    name: 'Regular',
    price: 999,
    currency: 'INR',
    description: 'For professionals and enthusiasts',
    quantity_limit: 500,
    sold_count: 120,
    includes: ['Access to all sessions', 'Premium lunch', 'Networking events', 'Digital badge', 'Post-event recordings'],
    sort_order: 2,
  },
  {
    name: 'VIP',
    price: 2499,
    currency: 'INR',
    description: 'Premium experience with exclusive perks',
    quantity_limit: 50,
    sold_count: 12,
    includes: ['VIP seating', 'Premium lunch', 'VIP networking lounge', 'Digital & physical badge', 'Post-event recordings', 'T-shirt', 'One-on-one with speakers'],
    sort_order: 3,
  },
];

export const SAMPLE_FAQS: Omit<FAQ, 'id'>[] = [
  {
    question: 'When is AWS Community Day 2026?',
    answer: 'AWS Community Day 2026 is on December 13, 2026, from 9:00 AM to 6:00 PM IST.',
    category: 'Event Details',
    sort_order: 1,
  },
  {
    question: 'Where is the event being held?',
    answer: 'The event is held at Parul University in Vadodara, Gujarat. The address is Limda, Vadodara, Gujarat 391110.',
    category: 'Venue',
    sort_order: 2,
  },
  {
    question: 'What should I bring to the event?',
    answer: 'Please bring your ticket confirmation (digital or printed), a valid ID, and your laptop if you want to participate in any hands-on sessions.',
    category: 'Event Details',
    sort_order: 3,
  },
  {
    question: 'Is there parking available?',
    answer: 'Yes, free parking is available at Parul University for all attendees.',
    category: 'Venue',
    sort_order: 4,
  },
  {
    question: 'Can I get a refund for my ticket?',
    answer: 'Full refunds are available until November 1, 2026. Partial refunds (50%) are available until November 30, 2026. No refunds after that date.',
    category: 'Tickets',
    sort_order: 5,
  },
  {
    question: 'Are there any group discounts?',
    answer: 'Yes! Groups of 5+ people get 15% off. Groups of 10+ people get 20% off. Contact us for details.',
    category: 'Tickets',
    sort_order: 6,
  },
  {
    question: 'Will there be food and beverages?',
    answer: 'Yes, lunch and snacks are included for all attendees. We cater for vegetarian, vegan, and other dietary preferences.',
    category: 'Event Details',
    sort_order: 7,
  },
  {
    question: 'Can I volunteer at the event?',
    answer: 'Absolutely! We\'re looking for volunteers. Visit the Volunteer page to apply for various roles.',
    category: 'Volunteer',
    sort_order: 8,
  },
];

export async function insertSampleData() {
  try {
    const [speakersRes, sponsorsRes, ticketsRes, faqsRes] = await Promise.all([
      supabase.from('speakers').insert(SAMPLE_SPEAKERS).select(),
      supabase.from('sponsors').insert(SAMPLE_SPONSORS).select(),
      supabase.from('ticket_tiers').insert(SAMPLE_TICKETS).select(),
      supabase.from('faqs').insert(SAMPLE_FAQS).select(),
    ]);

    console.log('Sample data inserted successfully');
    return {
      speakers: speakersRes.data,
      sponsors: sponsorsRes.data,
      tickets: ticketsRes.data,
      faqs: faqsRes.data,
    };
  } catch (error) {
    console.error('Error inserting sample data:', error);
    throw error;
  }
}
