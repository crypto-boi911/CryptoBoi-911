
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlitchText from '../components/GlitchText';
import CyberButton from '../components/CyberButton';

const Home = () => {
  const services = [
    {
      icon: Shield,
      title: 'Penetration Testing',
      description: 'Comprehensive security assessments to identify vulnerabilities before attackers do.',
    },
    {
      icon: Eye,
      title: 'Threat Intelligence',
      description: 'Real-time monitoring and analysis of emerging cybersecurity threats.',
    },
    {
      icon: Lock,
      title: 'Security Audits',
      description: 'Detailed evaluation of your security infrastructure and protocols.',
    },
    {
      icon: Zap,
      title: 'Incident Response',
      description: '24/7 rapid response team for security breaches and cyber incidents.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Clients Protected' },
    { number: '99.9%', label: 'Threat Detection Rate' },
    { number: '24/7', label: 'Monitoring' },
    { number: '15min', label: 'Response Time' },
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22grid%22%20width%3D%2220%22%20height%3D%2220%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Cpath%20d%3D%22M%2020%200%20L%200%200%200%2020%22%20fill%3D%22none%22%20stroke%3D%22%2300d4ff%22%20stroke-width%3D%220.5%22%20opacity%3D%220.3%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22url(%23grid)%22%20/%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GlitchText 
              text="CYBERKRYPT"
              className="text-6xl md:text-8xl font-cyber font-bold mb-6"
            />
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl md:text-4xl font-tech font-light text-cyber-light mb-8"
            >
              Advanced Cybersecurity Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-lg md:text-xl text-cyber-light/70 mb-12 max-w-3xl mx-auto"
            >
              Protecting your digital assets with cutting-edge security technologies and expert analysis.
              Stay ahead of cyber threats with our comprehensive protection suite.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/services">
                <CyberButton>
                  Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                </CyberButton>
              </Link>
              <Link to="/contact">
                <CyberButton variant="secondary">
                  Get Consultation
                </CyberButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-16 h-16 border border-cyber-blue/30 rotate-45"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-12 h-12 border border-cyber-green/30 rotate-12"
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-cyber font-bold text-cyber-blue mb-2">
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

      {/* Services Section */}
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
              Our Services
            </h2>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions tailored to protect your business
              from evolving digital threats.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glow-box bg-cyber-gray/50 p-6 rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300"
              >
                <service.icon className="h-12 w-12 text-cyber-blue mb-4" />
                <h3 className="text-xl font-tech font-semibold text-cyber-light mb-3">
                  {service.title}
                </h3>
                <p className="text-cyber-light/70">
                  {service.description}
                </p>
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
              Don't wait for a breach to happen. Contact our cybersecurity experts today
              and get a comprehensive security assessment.
            </p>
            <Link to="/contact">
              <CyberButton>
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </CyberButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
