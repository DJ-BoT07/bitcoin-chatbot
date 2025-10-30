import { useParams } from 'react-router-dom';
import CoinDetail from '../components/CoinDetail';
import PriceChart from '../components/PriceChart';

const CoinPage = () => {
  const { coinId } = useParams<{ coinId: string }>();

  if (!coinId) {
    return <div>Coin not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <PriceChart coinId={coinId} />
        <CoinDetail coinId={coinId} />
      </div>
    </div>
  );
};

export default CoinPage;