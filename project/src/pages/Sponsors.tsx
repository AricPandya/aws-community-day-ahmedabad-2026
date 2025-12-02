import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/Layout/SEOHead';
import { supabase, Sponsor } from '../lib/supabase';

const tiers = ['Platinum', 'Gold', 'Silver', 'Bronze'] as const;

export function Sponsors() {
  const [sponsors, setSponsors] = useState<Record<string, Sponsor[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from('sponsors')
          .select('*')
          .order('sort_order');

        const grouped = tiers.reduce(
          (acc, tier) => {
            acc[tier] = (data || []).filter((s) => s.tier === tier);
            return acc;
          },
          {} as Record<string, Sponsor[]>
        );
        setSponsors(grouped);
      } catch (error) {
        console.error('Error loading sponsors:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const metaDescription = 'Learn about our sponsors for AWS Community Day 2026. Interested in sponsoring? Check out our sponsorship packages.';

  return (
    <>
      <SEOHead
        title="Sponsors | AWS Community Day 2026"
        description={metaDescription}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Sponsors</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Supporting the AWS community through strategic partnerships.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center text-gray-500">Loading sponsors...</div>
            ) : (
              <>
                {tiers.map((tier) => {
                  const tierSponsors = sponsors[tier] || [];
                  if (tierSponsors.length === 0) return null;

                  return (
                    <div key={tier} className="mb-16">
                      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        {tier} Sponsors
                      </h2>
                      <div className={`grid gap-6 mb-8 ${
                        tier === 'Platinum'
                          ? 'grid-cols-1 md:grid-cols-2'
                          : tier === 'Gold'
                          ? 'grid-cols-2 md:grid-cols-3'
                          : 'grid-cols-2 md:grid-cols-4'
                      }`}>
                        {tierSponsors.map((sponsor) => (
                          <SponsorCard key={sponsor.id} sponsor={sponsor} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Sponsor</h2>
            <p className="text-gray-700 mb-8">
              Interested in supporting AWS Community Day 2026? We offer various sponsorship packages to match your business goals and budget.
            </p>
            <button className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors">
              Download Sponsorship Prospectus
            </button>
            <p className="text-gray-600 text-sm mt-4">
              Questions? Contact us at sponsors@awscommunityday2026.com
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.website_url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-orange-200 transition-all flex flex-col items-center justify-center min-h-40"
    >
      <div className="w-full aspect-square flex items-center justify-center mb-4">
        <img
          src={sponsor.logo_url}
          alt={sponsor.company_name}
          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
          loading="lazy"
        />
      </div>
      <h3 className="font-semibold text-gray-900 text-center group-hover:text-orange-600 transition-colors mb-2">
        {sponsor.company_name}
      </h3>
      {sponsor.description && (
        <p className="text-xs text-gray-600 text-center mb-3 line-clamp-2">{sponsor.description}</p>
      )}
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors opacity-0 group-hover:opacity-100" />
    </a>
  );
}
