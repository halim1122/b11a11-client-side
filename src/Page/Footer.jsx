import React from 'react';
import LogoImg from '../../src/assets/ChatGPT Image Jun 16, 2025, 05_08_07 PM.png'; // Replace with your image path
import { SiGoogleclassroom } from "react-icons/si";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";





const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10 dark:bg-black dark:text-white">
      <aside className="flex flex-col items-center space-y-3">
        <img className="w-20 h-20" src={LogoImg} alt="Logo" />
        <p className="font-bold text-center">
          Brain Band Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
        <p className="text-sm">Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4 text-inherit">
          <a href="https://classroom.google.com/?pli=1" target="_blank" rel="noopener noreferrer">
            <SiGoogleclassroom className="h-6 w-6 hover:text-secondary transition" />
          </a>
          <a href="https://www.facebook.com/rjah.king" target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare className="h-6 w-6 hover:text-secondary transition" />
          </a>
          <a href="https://x.com/md_halim32127" target="_blank" rel="noopener noreferrer">
            <FaTwitterSquare className="h-6 w-6 hover:text-secondary transition" />
          </a>
        </div>
      </nav>
    </footer>

  );
};

export default Footer;