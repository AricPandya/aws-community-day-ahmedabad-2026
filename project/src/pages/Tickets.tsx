import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { SEOHead } from '../components/Layout/SEOHead';
import { supabase, TicketTier } from '../lib/supabase';

export function Tickets() {
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from('ticket_tiers')
          .select('*')
          .order('sort_order');
        setTicketTiers(data || []);
      } catch (error) {
        console.error('Error loading tickets:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const metaDescription = 'Get your tickets for AWS Community Day 2026. Choose from Student, Regular, or VIP passes. Limited availability.';

  return (
    <>
      <SEOHead
        title="Tickets | AWS Community Day 2026"
        description={metaDescription}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get Your Tickets</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Choose the perfect ticket tier for your AWS Community Day experience.
            </p>
          </div>
        </section>

        <div className="text-center text-gray-500 mb-12">Ticket information coming soon...</div>

        {/* <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center text-gray-500">Loading ticket tiers...</div>
            ) : ticketTiers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {ticketTiers.map((tier, index) => (
                  <TicketCard key={tier.id} tier={tier} featured={index === 1} />
                ))}
              </div>
            ) : (
              
            )}

            <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Information</h2>
              <p className="text-gray-700 mb-4">
                We accept payments through our secure Stripe checkout. Once you purchase your ticket, you'll receive a confirmation email with your digital ticket and event details.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-600 p-4">
                <p className="text-sm text-gray-700">
                  <strong>Early Bird:</strong> Get 20% off with code EARLYBIRD until November 30, 2026.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Refund Policy</h2>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg">
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Full refund if requested before November 1, 2026</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>50% refund if requested between November 1-30, 2026</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>No refund for cancellations after November 30, 2026</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Tickets are transferable - no need to request a refund</span>
                </li>
              </ul>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}

function TicketCard({ tier, featured }: { tier: TicketTier; featured?: boolean }) {
  return (
    <div
      className={`rounded-lg overflow-hidden transition-all ${featured
        ? 'ring-2 ring-orange-600 shadow-lg scale-105'
        : 'border border-gray-200 hover:shadow-lg'
        } ${featured ? 'bg-gradient-to-br from-orange-50 to-white' : 'bg-white'}`}
    >
      {featured && (
        <div className="bg-orange-600 text-white text-center py-2 font-semibold text-sm">
          Most Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
        <p className="text-gray-600 text-sm mb-6 h-10">{tier.description}</p>

        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            {tier.currency === 'INR' && '₹'}
            {Math.round(tier.price)}
          </span>
          {tier.quantity_limit && (
            <p className="text-sm text-gray-500 mt-2">
              {tier.quantity_limit - tier.sold_count} of {tier.quantity_limit} available
            </p>
          )}
        </div>

        <button
          className={`w-full py-3 rounded-lg font-semibold transition-colors mb-6 ${featured
            ? 'bg-orange-600 text-white hover:bg-orange-700'
            : 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50'
            }`}
        >
          Select Ticket
        </button>

        {tier.includes && tier.includes.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900">What's Included:</p>
            {tier.includes.map((item, index) => (
              <div key={index} className="flex gap-3 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
