import { useState, useEffect } from 'react';
import type { GlobalData } from '../types/crypto';

const GlobalMarket = () => {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await response.json();
        setGlobalData(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching global data:', error);
        setLoading(false);
      }
    };

    fetchGlobalData();
    const interval = setInterval(fetchGlobalData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !globalData) {
    return <div className="animate-pulse h-48 bg-gray-200 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Global Market Stats 📊</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Active Cryptocurrencies</div>
          <div className="text-xl font-bold">{globalData.active_cryptocurrencies.toLocaleString()}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Active Markets</div>
          <div className="text-xl font-bold">{globalData.markets.toLocaleString()}</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Market Cap Change 24h</div>
          <div className={`text-xl font-bold ${
            globalData.market_cap_change_percentage_24h_usd > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%
          </div>
        </div>
        {Object.entries(globalData.market_cap_percentage).slice(0, 3).map(([symbol, percentage]) => (
          <div key={symbol} className="bg-yellow-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">{symbol.toUpperCase()} Dominance</div>
            <div className="text-xl font-bold">{percentage.toFixed(2)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalMarket;