import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Crypto Assistant</Link>
        <div className="flex space-x-4">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-lg hover:bg-blue-700 transition ${isActive('/')}`}
          >
            Chat
          </Link>
          <Link 
            to="/market" 
            className={`px-3 py-2 rounded-lg hover:bg-blue-700 transition ${isActive('/market')}`}
          >
            Market
          </Link>
          <Link 
            to="/trending" 
            className={`px-3 py-2 rounded-lg hover:bg-blue-700 transition ${isActive('/trending')}`}
          >
            Trending
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;