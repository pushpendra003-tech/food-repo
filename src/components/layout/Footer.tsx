import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const companyInfo = {
  name: 'FoodApp',
  phone: '+1 (555) 123-4567',
  email: 'hello@foodapp.com',
  address: '123 Food Street, Food City FC 12345'
}

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Support', href: '/support' },
  { name: 'Blog', href: '/blog' }
]

const services = [
  { name: 'Order Tracking', href: '/track' },
  { name: 'Help Center', href: '/help' },
  { name: 'Restaurant Partners', href: '/partners' },
  { name: 'Delivery Fleet', href: '/fleet' }
]

const cuisines = [
  'Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'American', 'Thai', 'Mediterranean'
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-800">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                🍔
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  FoodApp
                </h3>
                <p className="text-gray-400 text-sm">Delivering happiness, one meal at a time</p>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <span>{companyInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
                <span className="max-w-xs">{companyInfo.address}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:scale-105 transition-all duration-300 shadow-lg">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-lg">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:scale-105 transition-all duration-300 shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-red-500 hover:scale-105 transition-all duration-300 shadow-lg">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-orange-400 hover:underline transition-all duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.href}
                    className="text-gray-300 hover:text-orange-400 hover:underline transition-all duration-200 block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Popular Cuisines</h4>
            <div className="grid grid-cols-2 gap-2">
              {cuisines.map((cuisine) => (
                <span key={cuisine} className="text-gray-300 hover:text-orange-400 cursor-pointer transition-colors px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700">
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
