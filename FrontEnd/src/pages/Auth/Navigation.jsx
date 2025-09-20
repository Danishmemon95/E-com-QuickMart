import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { MdFormatListBulletedAdd, MdShoppingCartCheckout, MdCategory } from "react-icons/md";
import { FaHeart, FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/features/auth/authSlice";
import { useLogoutMutation } from "../../Redux/api/userApiSlice";
import "./Navigation.css";
import FavoritesCount from "../products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const NavItem = ({ to, icon: Icon, children, className = "", onClick }) => (
    <Link to={to} className={lex items-center transition-transform transform hover:translate-x-2 } onClick={onClick}>
      <Icon className="mr-2" size={26} />
      <span className="hidden nav-item-name">{children}</span>
    </Link>
  );

  const MobileNavItem = ({ to, icon: Icon, children, onClick }) => (
    <Link 
      to={to} 
      className="flex items-center p-4 text-white hover:bg-gray-700 transition-colors" 
      onClick={onClick}
    >
      <Icon className="mr-3" size={24} />
      <span>{children}</span>
    </Link>
  );

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <div
        style={{ zIndex: 999 }}
        className={desktop-nav  xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15rem] h-[100vh] fixed transition-all duration-300}
        id="navigation-container"
      >
        <div className="flex flex-col justify-center">
          <div className="flex relative mt-[1rem]">
            <NavItem to="/">
              <AiOutlineHome />
              HOME
            </NavItem>
          </div>
          
          <div className="flex relative mt-[2rem]">
            <NavItem to="/shop">
              <AiOutlineShopping />
              SHOP
            </NavItem>
          </div>

          <div className="flex relative mt-[2rem]">
            <NavItem to="/cart">
              <AiOutlineShoppingCart />
              Cart
            </NavItem>
            <div className="absolute mt-[-10px] ml-[17px]">
              {cartItems.length > 0 && (
                <span className="px-1 py-0 text-sm text-white bg-blue-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
          </div>

          <div className="flex relative mt-[2rem]">
            <div className="flex justify-center items-center transition-transform transform hover:translate-x-2 relative">
              <FaHeart className="mr-2" size={20} />
              <span className="hidden nav-item-name">Favorites</span>
              <FavoritesCount />
            </div>
          </div>

          <ul className="mr-14 space-y-2 text-white-600">
            {userInfo && userInfo.isAdmin && (
              <>
                <li>
                  <div className="flex relative mt-[2rem]">
                    <NavItem to="/admin/allproductslist">
                      <RxDashboard />
                      All Products
                    </NavItem>
                  </div>
                </li>
                <li>
                  <div className="flex relative mt-[2rem]">
                    <NavItem to="/admin/productlist">
                      <MdFormatListBulletedAdd />
                      Add Product
                    </NavItem>
                  </div>
                </li>
                <li>
                  <div className="flex relative mt-[2rem]">
                    <NavItem to="/admin/categorylist">
                      <MdCategory />
                      Category
                    </NavItem>
                  </div>
                </li>
                <li>
                  <div className="flex relative mt-[2rem]">
                    <NavItem to="/admin/orderlist">
                      <MdShoppingCartCheckout />
                      Orders
                    </NavItem>
                  </div>
                </li>
                <li>
                  <div className="flex relative mt-[2rem]">
                    <NavItem to="/admin/userlist">
                      <FiUsers />
                      Users
                    </NavItem>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="relative">
          <div className="flex items-center">
            {userInfo ? (
              <div>
                <div className="flex relative mt-[3rem]">
                  <NavItem to="/profile">
                    <FaRegUserCircle />
                    {userInfo.username}
                  </NavItem>
                </div>
                <button
                  onClick={logoutHandler}
                  className="flex justify-center items-center transition-transform transform hover:translate-x-2"
                >
                  <AiOutlineLogout className="mr-2 mt-5" size={26} />
                  <span className="hidden nav-item-name mt-3">Logout</span>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        {!userInfo && (
          <ul>
            <li>
              <div className="flex items-center mt-5 transition-transform transform hover:translate-x-2">
                <NavItem to="/login">
                  <AiOutlineLogin />
                  LOGIN
                </NavItem>
              </div>
            </li>
            <li>
              <div className="flex items-center mt-5 transition-transform transform hover:translate-x-2">
                <NavItem to="/register">
                  <AiOutlineUserAdd />
                  REGISTER
                </NavItem>
              </div>
            </li>
          </ul>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        {/* Mobile Header */}
        <div className="bg-black text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
          <Link to="/" className="text-xl font-bold">
            QuickMart
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Cart Icon with count */}
            <Link to="/cart" className="relative">
              <AiOutlineShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
            
            {/* Favorites */}
            <Link to="/favorite" className="relative">
              <FaHeart size={20} />
              <FavoritesCount />
            </Link>
            
            {/* Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {showMobileMenu ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}>
            <div className="fixed right-0 top-0 h-full w-80 bg-black text-white z-50 transform transition-transform">
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button onClick={toggleMobileMenu}>
                    <AiOutlineClose size={24} />
                  </button>
                </div>

                <nav className="space-y-2">
                  <MobileNavItem to="/" onClick={toggleMobileMenu}>
                    <AiOutlineHome />
                    Home
                  </MobileNavItem>
                  
                  <MobileNavItem to="/shop" onClick={toggleMobileMenu}>
                    <AiOutlineShopping />
                    Shop
                  </MobileNavItem>

                  {userInfo && userInfo.isAdmin && (
                    <>
                      <div className="border-t border-gray-700 my-4"></div>
                      <div className="text-gray-400 text-sm font-semibold px-4 py-2">Admin</div>
                      
                      <MobileNavItem to="/admin/allproductslist" onClick={toggleMobileMenu}>
                        <RxDashboard />
                        All Products
                      </MobileNavItem>
                      
                      <MobileNavItem to="/admin/productlist" onClick={toggleMobileMenu}>
                        <MdFormatListBulletedAdd />
                        Add Product
                      </MobileNavItem>
                      
                      <MobileNavItem to="/admin/categorylist" onClick={toggleMobileMenu}>
                        <MdCategory />
                        Category
                      </MobileNavItem>
                      
                      <MobileNavItem to="/admin/orderlist" onClick={toggleMobileMenu}>
                        <MdShoppingCartCheckout />
                        Orders
                      </MobileNavItem>
                      
                      <MobileNavItem to="/admin/userlist" onClick={toggleMobileMenu}>
                        <FiUsers />
                        Users
                      </MobileNavItem>
                    </>
                  )}

                  <div className="border-t border-gray-700 my-4"></div>

                  {userInfo ? (
                    <>
                      <MobileNavItem to="/profile" onClick={toggleMobileMenu}>
                        <FaRegUserCircle />
                        {userInfo.username}
                      </MobileNavItem>
                      
                      <button
                        onClick={() => {
                          logoutHandler();
                          toggleMobileMenu();
                        }}
                        className="flex items-center p-4 text-white hover:bg-gray-700 transition-colors w-full text-left"
                      >
                        <AiOutlineLogout className="mr-3" size={24} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <MobileNavItem to="/login" onClick={toggleMobileMenu}>
                        <AiOutlineLogin />
                        Login
                      </MobileNavItem>
                      
                      <MobileNavItem to="/register" onClick={toggleMobileMenu}>
                        <AiOutlineUserAdd />
                        Register
                      </MobileNavItem>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
