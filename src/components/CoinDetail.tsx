import { useState, useEffect } from 'react';
import type { CoinDetails } from '../types/crypto';

interface CoinDetailProps {
  coinId: string;
}

const CoinDetail = ({ coinId }: CoinDetailProps) => {
  const [coinData, setCoinData] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
        );
        const data = await response.json();
        setCoinData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };

    if (coinId) {
      fetchCoinData();
    }
  }, [coinId]);

  if (loading || !coinData) {
    return <div className="animate-pulse h-96 bg-gray-200 rounded-lg"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">{coinData.name} Details</h2>
          <div className="prose max-w-none mb-6" 
               dangerouslySetInnerHTML={{ __html: coinData.description.en.split('. ')[0] + '.' }} />
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Price Changes</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600">24h</div>
                  <div className={`font-bold ${
                    coinData.market_data.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">7d</div>
                  <div className={`font-bold ${
                    coinData.market_data.price_change_percentage_7d > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {coinData.market_data.price_change_percentage_7d.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">30d</div>
                  <div className={`font-bold ${
                    coinData.market_data.price_change_percentage_30d > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {coinData.market_data.price_change_percentage_30d.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Market Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap Rank</span>
                  <span className="font-bold">#{coinData.market_data.market_cap_rank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap</span>
                  <span className="font-bold">
                    ${coinData.market_data.market_cap.usd.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Volume</span>
                  <span className="font-bold">
                    ${coinData.market_data.total_volume.usd.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Links</h3>
          <div className="space-y-4">
            {coinData.links.homepage[0] && (
              <a
                href={coinData.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-50 hover:bg-blue-100 rounded-lg p-3 transition"
              >
                🌐 Official Website
              </a>
            )}
            {coinData.links.blockchain_site[0] && (
              <a
                href={coinData.links.blockchain_site[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-purple-50 hover:bg-purple-100 rounded-lg p-3 transition"
              >
                ⛓️ Blockchain Explorer
              </a>
            )}
            {coinData.links.subreddit_url && (
              <a
                href={coinData.links.subreddit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-orange-50 hover:bg-orange-100 rounded-lg p-3 transition"
              >
                🗣️ Reddit Community
              </a>
            )}
            {coinData.links.repos_url.github[0] && (
              <a
                href={coinData.links.repos_url.github[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition"
              >
                💻 GitHub Repository
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;