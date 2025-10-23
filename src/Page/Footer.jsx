import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import LogoImg from '../../src/assets/ChatGPT Image Jun 16, 2025, 05_08_07 PM.png';
import { SiGoogleclassroom } from "react-icons/si";
import { FaFacebookSquare, FaTwitterSquare, FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      icon: <SiGoogleclassroom className="h-6 w-6" />,
      href: "https://classroom.google.com/?pli=1",
      label: "Google Classroom",
      color: "hover:text-red-500"
    },
    {
      icon: <FaFacebookSquare className="h-6 w-6" />,
      href: "https://www.facebook.com/rjah.king",
      label: "Facebook",
      color: "hover:text-blue-500"
    },
    {
      icon: <FaTwitterSquare className="h-6 w-6" />,
      href: "https://x.com/md_halim32127",
      label: "Twitter",
      color: "hover:text-cyan-400"
    },
    {
      icon: <FaGithub className="h-6 w-6" />,
      href: "#",
      label: "GitHub",
      color: "hover:text-gray-400"
    },
    {
      icon: <FaLinkedin className="h-6 w-6" />,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-600"
    }
  ];

  const footerLinks = [
    { name: "About Us", href: "/about-Us" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9
    }
  };

  const heartVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.footer 
      className="bg-gradient-to-br from-primary to-secondary text-primary-content py-12 px-4 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo and Brand Section */}
          <motion.aside 
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.img 
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-lg"
                src={LogoImg} 
                alt="BrainBand Logo"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div>
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  BrainBand
                </motion.h2>
                <p className="text-primary-content/80 text-sm md:text-base">
                  Collaborative Learning Platform
                </p>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-lg font-semibold max-w-md"
              variants={itemVariants}
            >
              Empowering students through collaborative learning and peer education.
            </motion.p>
          </motion.aside>

          {/* Quick Links */}
          <motion.nav 
            className="flex flex-col items-center lg:items-end space-y-4"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="flex flex-wrap justify-center lg:justify-end gap-4">
              {footerLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-primary-content/80 hover:text-white transition-colors duration-300 font-medium"
                  whileHover={{ 
                    scale: 1.05,
                    x: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        </div>

        {/* Social Links */}
        <motion.nav 
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="flex gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20 text-white transition-all duration-300 ${social.color}`}
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* Copyright Section */}
        <motion.div 
          className="text-center border-t border-white/20 pt-8"
          variants={itemVariants}
        >
          <motion.p 
            className="text-primary-content/80 mb-2 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            Made with 
            <motion.span
              variants={heartVariants}
              animate="animate"
              className="text-red-400"
            >
              <FaHeart />
            </motion.span> 
            by BrainBand Team
          </motion.p>
          <motion.p 
            className="text-primary-content/60 text-sm"
            whileHover={{ scale: 1.02 }}
          >
            Copyright © {new Date().getFullYear()} - All rights reserved
          </motion.p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute -top-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.footer>
  );
};

export default Footer;