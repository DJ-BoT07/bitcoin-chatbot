import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your AI-Powered
            <span className="text-blue-400"> Crypto Assistant</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Get real-time cryptocurrency insights, market analysis, and expert AI guidance
            all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/market')}
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition"
            >
              Explore Market
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-transparent hover:bg-blue-800 border-2 border-blue-500 rounded-lg text-lg font-semibold transition"
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything You Need in One Place
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="💬"
              title="AI Chat Assistant"
              description="Get instant answers to your cryptocurrency questions from our AI-powered assistant."
            />
            <FeatureCard
              icon="📊"
              title="Real-time Market Data"
              description="Track live cryptocurrency prices, market caps, and trading volumes."
            />
            <FeatureCard
              icon="📈"
              title="Price Charts"
              description="Visualize price trends with interactive charts and detailed analytics."
            />
            <FeatureCard
              icon="🔥"
              title="Trending Coins"
              description="Stay updated with the hottest cryptocurrencies in the market."
            />
            <FeatureCard
              icon="🌐"
              title="Global Markets"
              description="Monitor global cryptocurrency market statistics and trends."
            />
            <FeatureCard
              icon="📱"
              title="Mobile Friendly"
              description="Access all features seamlessly across all your devices."
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Crypto Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who trust our platform for cryptocurrency insights.
          </p>
          <button
            onClick={() => navigate('/market')}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-semibold transition"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm border border-blue-800/50 hover:border-blue-500/50 transition">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default LandingPage;