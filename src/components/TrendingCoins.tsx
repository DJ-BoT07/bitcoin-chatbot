import { useState, useEffect } from 'react';
import type { TrendingCoin } from '../types/crypto';

const TrendingCoins = () => {
  const [trending, setTrending] = useState<TrendingCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const data = await response.json();
        setTrending(data.coins);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending coins:', error);
        setLoading(false);
      }
    };

    fetchTrending();
    const interval = setInterval(fetchTrending, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-200 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Trending Coins 🔥</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trending.map((coin) => (
          <div key={coin.item.id} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
            <img src={coin.item.thumb} alt={coin.item.name} className="w-8 h-8" />
            <div>
              <div className="font-medium">{coin.item.name}</div>
              <div className="text-sm text-gray-500">{coin.item.symbol.toUpperCase()}</div>
              <div className="text-xs text-gray-400">#{coin.item.score + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoins;