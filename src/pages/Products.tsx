import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Monitor, Database, Cloud, Smartphone, Lock } from 'lucide-react';
import CyberButton from '../components/CyberButton';

const Products = () => {
  const products = [
    {
      icon: Shield,
      name: 'Premium Bank logs',
      category: 'All country Suite',
      description: 'Complete Business and Personal Bank logs with Full Login credentials and balances',
      features: [
        'Acc Balance',
        'Username',
        'Password',
        'IP address',
        'Country',
        'Fullz Details'
      ],
      price: '$299/month',
      popular: true
    },
    {
      icon: Monitor,
      name: 'SecureWatch',
      category: 'Network Monitoring',
      description: 'Advanced network monitoring solution that provides comprehensive visibility into your network traffic and security events.',
      features: [
        'Network traffic analysis',
        'Anomaly detection',
        'Custom alerts',
        'Historical reporting',
        'Integration APIs',
        'Cloud-based dashboard'
      ],
      price: '$149/month',
      popular: false
    },
    {
      icon: Database,
      name: 'DataVault',
      category: 'Data Protection',
      description: 'Enterprise data encryption and backup solution ensuring your critical data remains secure and recoverable.',
      features: [
        'End-to-end encryption',
        'Automated backups',
        'Point-in-time recovery',
        'Compliance tools',
        'Multi-cloud support',
        'Data loss prevention'
      ],
      price: '$199/month',
      popular: false
    },
    {
      icon: Cloud,
      name: 'CloudGuard',
      category: 'Cloud Security',
      description: 'Comprehensive cloud security platform protecting your cloud infrastructure across multiple providers.',
      features: [
        'Multi-cloud protection',
        'Configuration monitoring',
        'Identity management',
        'Access controls',
        'Security posture assessment',
        'Cost optimization'
      ],
      price: '$249/month',
      popular: false
    },
    {
      icon: Smartphone,
      name: 'MobileShield',
      category: 'Mobile Security',
      description: 'Advanced mobile device management and security solution for protecting corporate mobile devices and data.',
      features: [
        'Device management',
        'App security scanning',
        'Remote data wipe',
        'Compliance monitoring',
        'VPN integration',
        'Threat protection'
      ],
      price: '$79/month',
      popular: false
    },
    {
      icon: Lock,
      name: 'SecureAuth',
      category: 'Identity Management',
      description: 'Multi-factor authentication and identity management platform providing secure access control.',
      features: [
        'Multi-factor authentication',
        'Single sign-on (SSO)',
        'Identity verification',
        'Access management',
        'Risk-based authentication',
        'API security'
      ],
      price: '$99/month',
      popular: false
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-cyber font-bold text-cyber-blue mb-6">
              Our Products
            </h1>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              Cutting-edge cybersecurity products designed to provide comprehensive
              protection for businesses of all sizes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative glow-box bg-cyber-gray/50 p-8 rounded-lg border transition-all duration-300 ${
                  product.popular 
                    ? 'border-cyber-blue border-2 animate-pulse-glow' 
                    : 'border-cyber-blue/20 hover:border-cyber-blue/50'
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cyber-blue text-cyber-dark px-4 py-1 rounded-full text-sm font-tech font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <product.icon className="h-16 w-16 text-cyber-blue mb-6" />
                
                <div className="mb-4">
                  <h3 className="text-2xl font-tech font-bold text-cyber-light mb-2">
                    {product.name}
                  </h3>
                  <span className="text-cyber-blue text-sm font-tech">
                    {product.category}
                  </span>
                </div>
                
                <p className="text-cyber-light/70 mb-6">
                  {product.description}
                </p>
                
                <ul className="space-y-2 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-cyber-light/60 text-sm flex items-center">
                      <div className="w-1 h-1 bg-cyber-blue rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-3xl font-cyber font-bold text-cyber-blue">
                      {product.price}
                    </span>
                    <span className="text-cyber-light/60 text-sm block">
                      per organization
                    </span>
                  </div>
                  <CyberButton>
                    Get Started
                  </CyberButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
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
              Why Choose Our Products?
            </h2>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              Our cybersecurity products are built with the latest technologies
              and backed by industry-leading expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Advanced AI Protection',
                description: 'Machine learning algorithms that adapt to new threats in real-time, providing proactive security measures.',
              },
              {
                title: 'Seamless Integration',
                description: 'Easy integration with existing infrastructure and third-party tools through comprehensive APIs.',
              },
              {
                title: 'Expert Support',
                description: '24/7 support from certified cybersecurity professionals with rapid response times.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-xl font-tech font-semibold text-cyber-light mb-4">
                  {item.title}
                </h3>
                <p className="text-cyber-light/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
