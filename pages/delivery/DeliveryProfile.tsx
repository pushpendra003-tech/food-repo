import MainLayout from "../../src/components/layout/MainLayout";
import { Star, MapPin, Phone, Truck, Award, Calendar } from 'lucide-react';

export default function DeliveryProfile() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-8 border-white">
              <span className="text-5xl">🚚</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Delivery Profile
            </h1>
            <p className="text-xl text-gray-600">Manage your profile, documents and delivery preferences</p>
          </div>

          {/* Stats Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center border border-emerald-100">
              <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                <Truck className="w-10 h-10" />
              </div>
              <p className="text-4xl font-bold text-emerald-600 mb-1">4.9</p>
              <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Overall Rating</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center border border-blue-100">
              <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                <Award className="w-10 h-10" />
              </div>
              <p className="text-4xl font-bold text-blue-600 mb-1">128</p>
              <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">5-Star Reviews</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center border border-green-100">
              <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                <Calendar className="w-10 h-10" />
              </div>
              <p className="text-4xl font-bold text-green-600 mb-1">247</p>
              <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Total Deliveries</p>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Personal Info */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                  👤
                </span>
                Personal Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="p-4 bg-gray-50 rounded-2xl font-semibold text-gray-900">
                    John Doe
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span className="font-semibold text-gray-900">+91 98765 43210</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                    <span className="font-semibold text-gray-900">john.doe@email.com</span>
                  </div>
                </div>
                <div className="flex gap-4 pt-4 border-t">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-2xl font-bold hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all">
                    Edit Profile
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-300 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Area & Vehicle */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                  🚚
                </span>
                Delivery Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Area</label>
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold text-gray-900">City Center - 15km radius</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>✅ Active</span>
                      <span className="w-20 h-2 bg-emerald-200 rounded-full">
                        <div className="w-16 h-2 bg-emerald-500 rounded-full"></div>
                      </span>
                      <span>85% coverage</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Details</label>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl">
                    <div>
                      <span className="text-xs text-gray-500">Type</span>
                      <div className="font-bold text-gray-900">Honda Activa</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">License Plate</span>
                      <div className="font-bold text-gray-900">DL 12 AB 1234</div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex gap-4">
                    <button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-2xl font-bold hover:from-emerald-600 hover:to-emerald-700 shadow-lg">
                      Update Area
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-300 rounded-2xl font-bold hover:bg-gray-50">
                      Update Vehicle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                📄
              </span>
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Driving License', status: 'valid', expiry: '2025-06-15', icon: '🚗' },
                { title: 'Vehicle RC', status: 'valid', expiry: '2025-03-20', icon: '📜' },
                { title: 'ID Proof', status: 'valid', expiry: 'Permanent', icon: '🆔' },
                { title: 'Bank Details', status: 'verified', expiry: 'N/A', icon: '🏦' },
              ].map((doc, index) => (
                <div key={index} className="group p-6 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl border-2 border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md text-2xl">
                      {doc.icon}
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      doc.status === 'valid' ? 'bg-emerald-100 text-emerald-800' :
                      doc.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{doc.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">Expires: {doc.expiry}</p>
                  <button className="w-full bg-white border border-gray-300 rounded-xl py-2 font-semibold hover:bg-gray-50 hover:shadow-md transition-all text-sm">
                    {doc.status === 'valid' ? 'View Document' : 'Upload Document'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {[5,4,3,2,1].map((stars) => (
              <div key={stars} className="bg-white p-8 rounded-3xl shadow-xl text-center border border-gray-100">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array(stars).fill(0).map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-amber-400 fill-amber-400" />
                  ))}
                  {Array(5-stars).fill(0).map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-gray-300" />
                  ))}
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stars}</p>
                <p className="text-sm text-gray-600 uppercase tracking-wide font-semibold mb-1">Stars</p>
                <p className="text-2xl font-bold text-emerald-600">23 reviews</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
