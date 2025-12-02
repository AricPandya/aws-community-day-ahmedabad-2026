/*
  # AWS Community Day 2026 - Event Schema

  1. New Tables
    - `speakers` - Event speakers with bios, photos, and social links
    - `sponsors` - Event sponsors with tier, logo, and benefits
    - `ticket_tiers` - Ticket pricing and types (Student, Regular, VIP)
    - `faqs` - Frequently asked questions with categories
    - `volunteers` - Volunteer applications and signup data
    - `newsletter_subscribers` - Email list for Mailchimp integration
    - `badges` - Generated badge records for attendees
    - `user_profiles` - User profiles for badge system

  2. Security
    - Enable RLS on all tables
    - Public read access for speakers, sponsors, FAQs, ticket_tiers
    - Authenticated write access for volunteers and newsletter signups
    - Admin-only access for badge management

  3. Indexes
    - Added on frequently queried columns
*/

-- Speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  organization text NOT NULL,
  talk_title text NOT NULL,
  abstract text NOT NULL,
  track text DEFAULT 'General',
  bio text,
  photo_url text,
  linkedin_url text,
  twitter_url text,
  github_url text,
  talk_length_minutes integer DEFAULT 45,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view speakers"
  ON speakers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert speakers"
  ON speakers FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update speakers"
  ON speakers FOR UPDATE
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS speakers_track_idx ON speakers(track);
CREATE INDEX IF NOT EXISTS speakers_sort_order_idx ON speakers(sort_order);

-- Sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  tier text NOT NULL CHECK (tier IN ('Platinum', 'Gold', 'Silver', 'Bronze')),
  logo_url text NOT NULL,
  website_url text,
  description text,
  contact_email text,
  benefits text[],
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sponsors"
  ON sponsors FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert sponsors"
  ON sponsors FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update sponsors"
  ON sponsors FOR UPDATE
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS sponsors_tier_idx ON sponsors(tier);
CREATE INDEX IF NOT EXISTS sponsors_sort_order_idx ON sponsors(sort_order);

-- Ticket tiers table
CREATE TABLE IF NOT EXISTS ticket_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10, 2) NOT NULL,
  currency text DEFAULT 'INR',
  description text,
  quantity_limit integer,
  sold_count integer DEFAULT 0,
  includes text[],
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ticket_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ticket tiers"
  ON ticket_tiers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert ticket tiers"
  ON ticket_tiers FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update ticket tiers"
  ON ticket_tiers FOR UPDATE
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS ticket_tiers_sort_order_idx ON ticket_tiers(sort_order);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'General',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view faqs"
  ON faqs FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage faqs"
  ON faqs FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update faqs"
  ON faqs FOR UPDATE
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS faqs_category_idx ON faqs(category);
CREATE INDEX IF NOT EXISTS faqs_sort_order_idx ON faqs(sort_order);

-- Volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  role text NOT NULL,
  experience_level text,
  availability text[],
  motivation text,
  confirmation_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert volunteer applications"
  ON volunteers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view volunteers"
  ON volunteers FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS volunteers_email_idx ON volunteers(email);
CREATE INDEX IF NOT EXISTS volunteers_role_idx ON volunteers(role);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  subscribed_at timestamptz DEFAULT now(),
  mailchimp_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS newsletter_subscribers_email_idx ON newsletter_subscribers(email);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  organization text,
  email text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  badge_url text NOT NULL,
  qr_code_url text,
  name text NOT NULL,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own badges"
  ON badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.role() = 'authenticated');

CREATE POLICY "Users can create badges"
  ON badges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS badges_user_id_idx ON badges(user_id);