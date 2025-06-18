import React from 'react';
import LogoImg from '../../src/assets/ChatGPT Image Jun 16, 2025, 05_08_07 PM.png'; // Replace with your image path
import { SiGoogleclassroom } from "react-icons/si";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";





const Footer = () => {
     return (
         <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
  <aside>
    <div>
      <img className='w-20 h-20' src={LogoImg} alt="" />
    </div>
    <p className="font-bold">
      Brain Band Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a href="https://classroom.google.com/?pli=1"><SiGoogleclassroom  className='h-6 w-6' /></a>
      <a href="https://www.facebook.com/rjah.king"><FaFacebookSquare  className='h-6 w-6' /></a>
      <a href="https://x.com/md_halim32127"><FaTwitterSquare  className='h-6 w-6' /></a>
    </div>
  </nav>
</footer>
     );
};

export default Footer;