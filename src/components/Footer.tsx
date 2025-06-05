
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cyber-darker border-t border-cyber-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="font-cyber text-xl font-bold text-cyber-blue">
                CRYPTOBOI-911
              </span>
            </div>
            <p className="text-cyber-light/70 font-tech">
              Advanced cybersecurity solutions protecting your digital assets from modern threats.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-tech font-semibold text-cyber-blue mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-cyber-light/70 hover:text-cyber-blue transition-colors duration-300">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-tech font-semibold text-cyber-blue mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-cyber-light/70">Bank Logs</li>
              <li className="text-cyber-light/70">Cards & Linkables</li>
              <li className="text-cyber-light/70">PayPal Logs</li>
              <li className="text-cyber-light/70">CashApp Logs</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-tech font-semibold text-cyber-blue mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-cyber-light/70">
                <Mail className="h-4 w-4" />
                <span>info@cyberkrypt.com</span>
              </div>
              <div className="flex items-center space-x-2 text-cyber-light/70">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-cyber-light/70">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cyber-blue/20 mt-8 pt-8 text-center">
          <p className="text-cyber-light/50 font-tech">
            © 2024 CRYPTOBOI-911. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
