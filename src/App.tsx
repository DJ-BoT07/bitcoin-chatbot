import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage';
import MarketPage from './pages/MarketPage';
import TrendingPage from './pages/TrendingPage';
import CoinPage from './pages/CoinPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/coin/:coinId" element={<CoinPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
