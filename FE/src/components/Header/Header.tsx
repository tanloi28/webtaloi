import { Input } from 'antd';
import { useContext } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext, AuthContextType } from '../../contexts/AuthContext';

const { Search } = Input;

const Header = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;

  return (
    <>
      <header>
        {/* Top Navbar */}
        <nav className="p-8 bg-black hidden lg:block" id="templatemo_nav_top">
          <div className="container text-light mx-auto px-4">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center">
                <FiMail className="mx-2" color='white' />
                <a href="mailto:khongtanloi28032004@gmail.com" className="text-white no-underline">khongtanloi28032004@gmail.com</a>
                <FiPhone className="mx-2" color='white' />
                <a href="tel:033-731-3669" className="text-white no-underline">033-731-3669</a>
              </div>
              <div className="flex items-center">
                <a href="https://fb.com/templatemo" target="_blank" rel="sponsored" className="text-white mx-2">
                  <FiFacebook color='white' />
                </a>
                <a href="https://www.instagram.com/" target="_blank" className="text-white mx-2">
                  <FiInstagram color='white' />
                </a>
                <a href="https://twitter.com/" target="_blank" className="text-white mx-2">
                  <FiTwitter color='white' />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" className="text-white mx-2">
                  <FiLinkedin color='white' />
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Navbar */}
        <nav className="bg-white shadow">
          <div className="container mx-auto flex justify-between items-center py-4">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-gray-800">
                Zay
              </a>
            </div>
            <div className="flex justify-center items-center text-xl flex-grow">
              <ul className="flex mx-auto">
                <li className="mr-6">
                  <a href="/" className="text-gray-800 hover:text-gray-900">Home</a>
                </li>
                <li className="mr-6">
                  <a href="/admin" className="text-gray-800 hover:text-gray-900">Admin</a>
                </li>
                <li className="mr-6">
                  <a href="/shop" className="text-gray-800 hover:text-gray-900">Shop</a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-800 hover:text-gray-900">Contact</a>
                </li>
              </ul>
            </div>
            <div className="flex items-center">
              <Link to="/cart" className="ml-4 relative">
                <FaShoppingCart className="text-gray-800" size={30} />
              </Link>
              {user ? (
                <>
                  <span>Welcome, {user.email}</span>
                  <button onClick={logout}>Logout</button>
                  {user.role === "admin" && (
                    <Link to="/admin">Admin</Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <ToastContainer />
    </>
  );
};

export default Header;
