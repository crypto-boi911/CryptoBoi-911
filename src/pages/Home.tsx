
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, ArrowRight, Lock, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import CyberButton from '../components/CyberButton';
import GlitchText from '../components/GlitchText';

const Home = () => {
  return (
    <div className="min-h-screen bg-cyber-gradient">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-cyber font-bold text-cyber-blue mb-6">
              <GlitchText text="CYBERGUARD" />
            </h1>
            <p className="text-xl md:text-2xl text-cyber-light/80 mb-8 max-w-3xl mx-auto">
              Advanced cybersecurity solutions protecting your digital assets 
              with cutting-edge technology and uncompromising security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-started">
                <CyberButton size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </CyberButton>
              </Link>
              <Link to="/services">
                <button className="px-8 py-4 border-2 border-cyber-blue text-cyber-blue font-tech hover:bg-cyber-blue hover:text-cyber-dark transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-6">
              Why Choose CyberGuard?
            </h2>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              We provide comprehensive cybersecurity solutions that adapt to the 
              ever-evolving threat landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Advanced Protection',
                description: 'State-of-the-art security measures using AI-powered threat detection and real-time monitoring.',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Instant threat response and mitigation with our high-performance security infrastructure.',
              },
              {
                icon: Globe,
                title: 'Global Coverage',
                description: 'Worldwide security operations with 24/7 monitoring and support across all time zones.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="glow-box bg-cyber-gray/50 p-8 rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300"
              >
                <feature.icon className="h-16 w-16 text-cyber-blue mb-6" />
                <h3 className="text-xl font-tech font-semibold text-cyber-light mb-4">
                  {feature.title}
                </h3>
                <p className="text-cyber-light/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-6">
              Trusted by Thousands
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Protected Devices' },
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '24/7', label: 'Security Monitoring' },
              { number: '500+', label: 'Enterprise Clients' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-cyber-light/70 font-tech">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-cyber font-bold text-cyber-blue mb-6">
              Ready to Secure Your Future?
            </h2>
            <p className="text-xl text-cyber-light/70 mb-8 max-w-3xl mx-auto">
              Join thousands of organizations that trust CyberGuard to protect 
              their most valuable digital assets.
            </p>
            <Link to="/get-started">
              <CyberButton size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </CyberButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
