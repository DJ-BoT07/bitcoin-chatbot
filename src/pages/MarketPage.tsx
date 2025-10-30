import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalMarket from '../components/GlobalMarket';
import CryptoTracker from '../components/CryptoTracker';
import type { CoinData } from '../types/crypto';

const MarketPage = () => {
  const navigate = useNavigate();

  const handleCoinClick = (coinId: string) => {
    navigate(`/coin/${coinId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <GlobalMarket />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Cryptocurrency Market</h2>
          <div className="overflow-x-auto">
            <CryptoTracker onCoinClick={handleCoinClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;