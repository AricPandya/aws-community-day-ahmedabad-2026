import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SEOHead } from '../components/Layout/SEOHead';
import { supabase, FAQ } from '../lib/supabase';

export function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from('faqs')
          .select('*')
          .order('sort_order');
        setFaqs(data || []);
      } catch (error) {
        console.error('Error loading FAQs:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = ['All', ...new Set(faqs.map((faq) => faq.category))];
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const metaDescription = 'Frequently asked questions about AWS Community Day 2026. Find answers to common questions about tickets, venue, speakers, and more.';

  return (
    <>
      <SEOHead
        title="FAQ | AWS Community Day 2026"
        description={metaDescription}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Find answers to common questions about AWS Community Day 2026.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <input
                type="search"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                aria-label="Search FAQs"
              />
            </div>

            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <div className="text-center text-gray-500">Loading FAQs...</div>
            ) : filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <FAQItem key={faq.id} faq={faq} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                {searchTerm || selectedCategory !== 'All'
                  ? 'No FAQs found. Try adjusting your filters.'
                  : 'FAQs coming soon...'}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-left font-semibold text-gray-900">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          {faq.category && (
            <p className="text-xs text-gray-500 mt-4">
              Category: <span className="font-medium">{faq.category}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
