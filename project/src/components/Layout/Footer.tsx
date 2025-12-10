import { Mail, MapPin, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">AWS Community Day 2026</h3>
            <p className="text-gray-400 text-sm">
              Connecting cloud professionals and students in Gujarat.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Event</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/venue" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Venue & Location
                </Link>
              </li>
              <li>
                <Link to="/speakers" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Speakers
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-orange-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/badge" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Badge
                </Link>
              </li>
              <li>
                <Link to="/travel" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Travel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sponsors" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Sponsors
                </Link>
              </li>
              <li>
                <Link to="/volunteers" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.linkedin.com/company/awsahmedabadcommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/awsugahm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:awsugahm@gmail.com"
                className="text-gray-400 hover:text-orange-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <a
              href="mailto:awsugahm@gmail.com"
              className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
            >
              awsugahm@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2026 AWS User Group Ahmedabad. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/code-of-conduct" className="hover:text-orange-400 transition-colors">
                Code of Conduct
              </Link>
              <Link to="/privacy" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/accessibility" className="hover:text-orange-400 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
