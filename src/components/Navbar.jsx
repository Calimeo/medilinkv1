import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaBars,
  FaTimes,
  FaRegCalendarCheck,
  FaRegHeart,
  FaUserCircle,
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from "../Context/Context.jsx";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const navItems = [
    { to: "/specialities", label: "Spécialités" },
    { to: "/pharmacy", label: "Pharmacie" },
    { to: "/appointment", label: "Rendez-vous" },
    { to: "/doctor/search", label: "Recherche" },
    { to: "/message", label: "Messages" },
  ];

  const dropdownMenus = [
    { to: "/profile", label: "Profil", icon: FaUserCircle },
    { to: "/appointments", label: "Mes rendez-vous", icon: FaRegCalendarCheck },
    { to: "/doctor/follow", label: "Docteurs suivis", icon: FaRegHeart },
    { to: "/medicines/order_history", label: "Commandes", icon: LuBox },
    { to: "#", label: "Déconnexion", icon: IoIosLogOut },
  ];

  const socialLinks = [
    { to: "", icon: FaGithub },
    { to: "", icon: FaLinkedinIn },
    { to: "", icon: FaDiscord },
  ];

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium px-2 py-1 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-cyan-600 before:transition-all before:duration-300 hover:before:w-full hover:text-cyan-700 transition-colors ${
      isActive ? "text-cyan-700" : "text-gray-700"
    }`;

  const handleNavigation = () => navigate("/medicines/cart");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/homepage" className="text-2xl font-bold text-cyan-700">
          MediLink
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* Dropdown */}
          <li className="relative">
            <button
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              onClick={() => {
                if (!isAuthenticated) navigate("/login");
              }}
              className="flex items-center gap-2 px-3 py-1 border border-cyan-600 rounded text-cyan-600 hover:bg-cyan-50 transition"
            >
              <FaUserCircle />
              <span>Menu</span>
            </button>

            {isAuthenticated && isDropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute right-0 mt-2 w-60 bg-white border shadow-lg rounded z-50"
              >
                {dropdownMenus.map((menu) => (
                  <div
                    key={menu.label}
                    onClick={() => {
                      if (menu.label === "Déconnexion") handleLogOut();
                      else navigate(menu.to);
                    }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    <menu.icon className="text-cyan-600" />
                    {menu.label}
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Cart + Social (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative cursor-pointer" onClick={handleNavigation}>
            <IoCartOutline className="text-2xl text-cyan-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {socialLinks.map((link, idx) => (
            <a key={idx} href={link.to} target="_blank" rel="noreferrer">
              <link.icon className="text-gray-600 hover:text-cyan-600 transition" />
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-cyan-700"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 py-2 border-b"
            >
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated &&
            dropdownMenus.map((menu) => (
              <div
                key={menu.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (menu.label === "Déconnexion") handleLogOut();
                  else navigate(menu.to);
                }}
                className="flex items-center gap-2 py-2 border-b text-gray-700"
              >
                <menu.icon className="text-cyan-600" />
                {menu.label}
              </div>
            ))}

          <div className="flex items-center justify-between pt-4 border-t">
            <div
              onClick={handleNavigation}
              className="flex items-center gap-1 cursor-pointer"
            >
              <IoCartOutline className="text-cyan-700 text-xl" />
              {cartCount > 0 && (
                <span className="text-sm text-red-600">({cartCount})</span>
              )}
            </div>

            <div className="flex gap-3">
              {socialLinks.map((link, idx) => (
                <a key={idx} href={link.to} target="_blank" rel="noreferrer">
                  <link.icon className="text-gray-600 hover:text-cyan-600 text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
