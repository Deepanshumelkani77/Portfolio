import React, { useState, useEffect, useRef } from 'react';
import OverlayMenu from './OverlayMenu.jsx';
import logo from "../assets/Logo.png";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);
  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (homeSection) {
      observer.observe(homeSection);
    }

    return () => {
      if (homeSection) {
        observer.unobserve(homeSection);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible) {
        setVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);

        if (timerId.current) {
          clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [forceVisible]);

  return (
    <>
      <nav className={`fixed w-full top-0 left-0 flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <div className="text-2xl font-bold text-white hidden sm:block cursor-pointer">Dev</div>
        </div>

        <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 cursor-pointer">
          <button 
            onClick={() => setMenuOpen(true)} 
            className="text-white text-3xl focus:outline-none cursor-pointer"
          >
            <FiMenu />
          </button>
        </div>

        <div className="hidden lg:block">
          <a 
            href="#contact" 
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;