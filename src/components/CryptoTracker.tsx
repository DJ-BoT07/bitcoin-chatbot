import { useState, useEffect } from 'react';
import type { CoinData } from '../types/crypto';

interface CryptoTrackerProps {
  onCoinClick?: (coinId: string) => void;
}

const CryptoTracker = ({ onCoinClick }: CryptoTrackerProps) => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching cryptocurrency data');
        setLoading(false);
      }
    };

    fetchCryptoData();
    // Refresh data every 60 seconds
    const interval = setInterval(fetchCryptoData, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">Live Cryptocurrency Prices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Coin</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-right">24h Change</th>
              <th className="px-6 py-3 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr 
                key={coin.id} 
                className="border-b hover:bg-gray-50 cursor-pointer" 
                onClick={() => onCoinClick?.(coin.id)}
              >
                <td className="px-6 py-4 flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                  <span className="font-medium">{coin.name}</span>
                  <span className="text-gray-500 ml-2">({coin.symbol.toUpperCase()})</span>
                </td>
                <td className="px-6 py-4 text-right">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td className={`px-6 py-4 text-right ${
                  coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-right">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center text-sm text-gray-500 mt-4">
        Data provided by CoinGecko
      </div>
    </div>
  );
};

export default CryptoTracker;