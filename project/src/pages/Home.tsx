import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { SEOHead } from "../components/Layout/SEOHead";
import { Countdown } from "../components/Countdown";
import { supabase, Sponsor } from "../lib/supabase";
import { eventSchema, DEFAULT_KEYWORDS } from "../lib/seo";

export function Home() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: sponsorsData, error: sponsorsError } = await supabase
          .from("sponsors")
          .select("*")
          .order("sort_order")
          .limit(6);

        if (sponsorsError) throw sponsorsError;
        setSponsors(sponsorsData || []);
      } catch (error) {
        console.error("Error loading home data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const metaDescription =
    "Join AWS Community Day 2026 on 28th Feb in Ahmedabad. Learn from industry leaders, connect with fellow cloud enthusiasts, and explore the latest in AWS technologies.";

  return (
    <>
      <SEOHead
        title="AWS Community Day Ahmedabad 2026"
        description={metaDescription}
        schema={eventSchema}
        keywords={DEFAULT_KEYWORDS}
      />

      <main className="min-h-screen">
        <section className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-20 pb-12 md:pt-32 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Save the Date
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                AWS Community Day Ahmedabad
                <span className="text-orange-600"> 2026</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Connect with cloud professionals and students. Learn from
                industry leaders. Shape the future of cloud computing in
                Gujarat.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link
                  to="/tickets"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Get Your Tickets <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/speakers"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
                >
                  See Speakers
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center mb-8">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600">February 28, 2026</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600">Ahmedabad, Gujarat</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600">1500+ attendees</p>
                </div>
              </div>

              <Countdown />
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Featured Speakers
            </h2>
            <div className="text-center text-gray-500">Loading speakers...</div>
          </div>
        </section>

        <section className="bg-gray-50 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Our Sponsors
            </h2>
            {loading ? (
              <div className="text-center text-gray-500">
                Loading sponsors...
              </div>
            ) : (
              <>
                {sponsors.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8 items-center">
                    {sponsors.map((sponsor) => (
                      <a
                        key={sponsor.id}
                        href={sponsor.website_url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow flex items-center justify-center min-h-24"
                      >
                        <img
                          src={sponsor.logo_url}
                          alt={sponsor.company_name}
                          className="max-w-full max-h-20 object-contain"
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 mb-8">
                    Sponsor logos coming soon...
                  </div>
                )}
                <div className="text-center">
                  <Link
                    to="/sponsors"
                    className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                  >
                    Become a Sponsor <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="bg-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Community Driven
                </h3>
                <p className="text-gray-600">
                  Organized by and for the AWS community in Gujarat. Connect
                  with peers who share your passion for cloud.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Learn & Grow
                </h3>
                <p className="text-gray-600">
                  Attend talks from industry experts covering latest AWS trends,
                  best practices, and real-world implementations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Network & Connect
                </h3>
                <p className="text-gray-600">
                  Meet cloud professionals, students, and enthusiasts. Build
                  lasting relationships and collaborations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
