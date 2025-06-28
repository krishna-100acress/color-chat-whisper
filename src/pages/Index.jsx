
import Chatbot from '@/components/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 opacity-90"></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/15 rounded-full blur-xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Discover the Ideal Spot to Make Your Own
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Find your perfect property with our comprehensive real estate solutions
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
                />
              </div>
              <button className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Search
              </button>
            </div>
            
            {/* Property Types */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots', 'SCO'].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    type === 'Buy' 
                      ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">Your trusted partner in real estate</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Guidance",
                description: "Our experienced team provides professional advice throughout your property journey",
                icon: "🏠"
              },
              {
                title: "Prime Locations",
                description: "Access to premium properties in the most sought-after locations",
                icon: "📍"
              },
              {
                title: "Flexible Payment Plans",
                description: "Attractive payment schemes and financing options to suit your budget",
                icon: "💳"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-400 to-yellow-400">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get started today with our comprehensive property search
          </p>
          <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            List Property - FREE
          </button>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
