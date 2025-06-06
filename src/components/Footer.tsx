
import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cyber-darker/80 border-t border-cyber-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-cyber-blue" />
            <span className="font-cyber text-lg font-bold text-cyber-blue">
              HUXLOGS
            </span>
          </div>
          
          <div className="text-cyber-light/60 text-sm text-center md:text-right">
            <p>&copy; 2024 HUXLOGS. All rights reserved.</p>
            <p className="mt-1">Premium cybersecurity solutions</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
