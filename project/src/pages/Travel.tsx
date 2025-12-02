import { Hotel, Navigation, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/Layout/SEOHead';

export function Travel() {
  const hotels = [
    {
      name: 'The Gateway Hotel',
      category: '★★★★',
      price: '₹8,500+',
      distance: '8 km from venue',
      phone: '+91 265 XXX XXXX',
      website: 'https://thegatewaynigeria.com',
    },
    {
      name: 'Taj Vadodara',
      category: '★★★★★',
      price: '₹12,000+',
      distance: '10 km from venue',
      phone: '+91 265 XXX XXXX',
      website: 'https://tajhotels.com',
    },
    {
      name: 'Grand Bhagwati',
      category: '★★★',
      price: '₹3,500+',
      distance: '6 km from venue',
      phone: '+91 265 XXX XXXX',
      website: 'https://grandbhagwati.com',
    },
  ];

  const metaDescription = 'Travel guide for AWS Community Day 2026. Hotel recommendations, transport options, and visa information for attendees.';

  return (
    <>
      <SEOHead
        title="Travel Guide | AWS Community Day 2026"
        description={metaDescription}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Travel Guide</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Everything you need to know about getting to AWS Community Day 2026.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting to Vadodara</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">By Air</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Sardar Vallabhbhai Patel Int'l Airport (AMD)</strong>
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• 110 km from Vadodara</li>
                  <li>• ~2.5 hours by taxi/Ola</li>
                  <li>• Daily flights from major cities</li>
                  <li>• Expected fare: ₹2,000-3,500</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">By Train</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Vadodara Railway Station (BRC)</strong>
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Central location, easy access</li>
                  <li>• Trains from Delhi, Mumbai, Bangalore</li>
                  <li>• ~30-45 min to venue by taxi</li>
                  <li>• Auto/cab available 24/7</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">By Road</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Highway NH-48 Connection</strong>
                </p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• From Ahmedabad: 110 km (~2 hrs)</li>
                  <li>• From Surat: 150 km (~2.5 hrs)</li>
                  <li>• Well-maintained highway</li>
                  <li>• Free parking at venue</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-12">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  <strong>Travel Tips:</strong> Book hotels early for better rates. December is peak travel season in India. Consider ride-sharing services (Ola, Uber) for convenience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Recommended Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {hotels.map((hotel, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{hotel.name}</h3>
                        <p className="text-sm text-gray-600">{hotel.category}</p>
                      </div>
                      <Hotel className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-lg font-semibold text-orange-600 mb-3">{hotel.price}/night</p>
                    <ul className="space-y-2 text-sm text-gray-600 mb-4">
                      <li>📍 {hotel.distance}</li>
                      <li>📞 {hotel.phone}</li>
                    </ul>
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
                    >
                      Visit website →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3">Budget Alternatives</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• OYO Rooms: ₹1,500-2,500/night</li>
                <li>• Airbnb: ₹1,200-3,000/night</li>
                <li>• Youth Hostels: ₹500-1,000/night</li>
                <li>• Guest Houses: ₹1,000-1,800/night</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Around Vadodara</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Local Transport</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Ola/Uber:</strong> Ride-sharing apps available throughout the city. Estimated ₹100-200 for short distances.
                  </li>
                  <li>
                    <strong>Auto Rickshaw:</strong> Cheapest option. Negotiate fare before boarding or use Ola Auto.
                  </li>
                  <li>
                    <strong>Taxi:</strong> Pre-book taxis for airport/station pickups. ~₹800-1,200.
                  </li>
                  <li>
                    <strong>Local Buses:</strong> Good network. Single fare ~₹5-10.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Useful Information</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Currency:</strong> Indian Rupee (₹). ATMs widely available.
                  </li>
                  <li>
                    <strong>SIM Cards:</strong> Get a local SIM at airport for better rates.
                  </li>
                  <li>
                    <strong>Weather:</strong> December is pleasant. Bring light clothing and comfortable shoes.
                  </li>
                  <li>
                    <strong>Languages:</strong> English widely spoken. Gujarati is local language.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Visa Information for International Attendees</h2>

            <div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Indian Visa</h3>
                  <p className="text-gray-700 mb-3">
                    Most international visitors need a visa to enter India. Check your eligibility for e-Visa or visa-on-arrival.
                  </p>
                  <a
                    href="https://indianvisaonline.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    Apply for Indian e-Visa →
                  </a>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-gray-900 mb-2">Visa Duration</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Business e-Visa: 30-60 days (1-3 year validity)</li>
                    <li>• Tourist e-Visa: 30-60 days (1-2 year validity)</li>
                    <li>• Processing: Usually 24-72 hours</li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-gray-900 mb-2">Documents Needed</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Valid passport (6 months validity)</li>
                    <li>• Recent passport photo</li>
                    <li>• Proof of stay (hotel booking)</li>
                    <li>• Return flight ticket</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help Planning Your Trip?</h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Have questions about travel arrangements? Our team is here to help. Contact us for travel assistance.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
