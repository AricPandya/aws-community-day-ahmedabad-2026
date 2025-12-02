import { useState, useRef } from 'react';
import { Download, Share2, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/Layout/SEOHead';

export function Badge() {
  const [formState, setFormState] = useState({
    name: '',
    role: '',
    organization: '',
  });
  const [badge, setBadge] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const generateBadge = async () => {
    if (!formState.name.trim() || !formState.role) return;

    setLoading(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1200;
      canvas.height = 1600;

      ctx.fillStyle = 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);

      ctx.fillStyle = '#ea580c';
      ctx.fillRect(40, 40, canvas.width - 80, 80);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('AWS COMMUNITY DAY', canvas.width / 2, 105);

      ctx.fillStyle = '#333';
      ctx.font = 'bold 72px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(formState.name, canvas.width / 2, 400);

      ctx.fillStyle = '#666';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(formState.role, canvas.width / 2, 520);

      if (formState.organization) {
        ctx.fillStyle = '#999';
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(formState.organization, canvas.width / 2, 620);
      }

      ctx.fillStyle = '#ea580c';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('December 13, 2026', canvas.width / 2, canvas.height - 100);

      ctx.fillStyle = '#999';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Parul University, Vadodara', canvas.width / 2, canvas.height - 50);

      const badgeImage = canvas.toDataURL('image/png');
      setBadge(badgeImage);
    } catch (error) {
      console.error('Error generating badge:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadBadge = () => {
    if (!badge) return;
    const link = document.createElement('a');
    link.href = badge;
    link.download = `${formState.name}-badge.png`;
    link.click();
  };

  const shareBadge = () => {
    if (!badge && navigator.share) {
      navigator.share({
        title: `${formState.name}'s AWS Community Day Badge`,
        text: `I got my badge for AWS Community Day 2026!`,
      });
    }
  };

  const metaDescription = 'Generate your personalized digital badge for AWS Community Day 2026. Share on social media and celebrate your attendance.';

  return (
    <>
      <SEOHead
        title="Digital Badge | AWS Community Day 2026"
        description={metaDescription}
      />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-orange-50 to-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Digital Badge</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Generate your personalized badge and share your AWS Community Day experience on social media.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Badge</h2>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Your Role *
                    </label>
                    <select
                      name="role"
                      value={formState.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    >
                      <option value="">Select your role...</option>
                      <option value="Developer">Developer</option>
                      <option value="Architect">Architect</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                      <option value="Cloud Specialist">Cloud Specialist</option>
                      <option value="Student">Student</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formState.organization}
                      onChange={handleChange}
                      placeholder="Your company or school (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={generateBadge}
                    disabled={loading || !formState.name || !formState.role}
                    className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
                  >
                    {loading ? 'Generating...' : 'Generate Badge'}
                  </button>

                  {badge && (
                    <div className="flex gap-2">
                      <button
                        onClick={downloadBadge}
                        className="flex-1 py-2 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button
                        onClick={shareBadge}
                        className="flex-1 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      Use this badge on social media to celebrate your participation in AWS Community Day 2026!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                {badge ? (
                  <div className="w-full">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Your Badge Preview</h3>
                    <img
                      src={badge}
                      alt="Generated badge"
                      className="w-full rounded-lg shadow-lg border border-gray-200"
                    />
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="w-64 h-96 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <p>Your badge will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </main>
    </>
  );
}
