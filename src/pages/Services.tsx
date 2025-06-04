
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Zap, Search, Users, Database, Wifi } from 'lucide-react';
import CyberButton from '../components/CyberButton';

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: 'Penetration Testing',
      description: 'Comprehensive security assessments that simulate real-world attacks to identify vulnerabilities in your systems before malicious actors do.',
      features: ['Network Penetration Testing', 'Web Application Testing', 'Mobile App Security', 'Social Engineering Tests'],
      price: 'Starting at $5,000'
    },
    {
      icon: Eye,
      title: 'Threat Intelligence',
      description: 'Real-time monitoring and analysis of emerging cybersecurity threats with actionable intelligence to protect your organization.',
      features: ['24/7 Threat Monitoring', 'IOC Detection', 'Dark Web Monitoring', 'Threat Hunting'],
      price: 'Starting at $2,500/month'
    },
    {
      icon: Lock,
      title: 'Security Audits',
      description: 'Detailed evaluation of your security infrastructure, policies, and procedures to ensure compliance and optimal protection.',
      features: ['Infrastructure Assessment', 'Policy Review', 'Compliance Auditing', 'Risk Assessment'],
      price: 'Starting at $3,000'
    },
    {
      icon: Zap,
      title: 'Incident Response',
      description: '24/7 rapid response team for security breaches and cyber incidents with complete forensic analysis and recovery planning.',
      features: ['Emergency Response', 'Forensic Analysis', 'Recovery Planning', 'Legal Support'],
      price: 'Starting at $1,500/incident'
    },
    {
      icon: Search,
      title: 'Vulnerability Assessment',
      description: 'Systematic examination of security weaknesses in your IT infrastructure with detailed remediation recommendations.',
      features: ['Automated Scanning', 'Manual Verification', 'Risk Prioritization', 'Remediation Guidance'],
      price: 'Starting at $2,000'
    },
    {
      icon: Users,
      title: 'Security Training',
      description: 'Comprehensive cybersecurity awareness training for your team to build a human firewall against social engineering attacks.',
      features: ['Phishing Simulations', 'Security Workshops', 'Awareness Campaigns', 'Custom Training'],
      price: 'Starting at $150/person'
    },
    {
      icon: Database,
      title: 'Data Protection',
      description: 'Advanced data encryption, backup, and recovery solutions to ensure your critical information remains secure and accessible.',
      features: ['Data Encryption', 'Backup Solutions', 'Recovery Planning', 'Compliance Management'],
      price: 'Starting at $4,000'
    },
    {
      icon: Wifi,
      title: 'Network Security',
      description: 'Complete network security solutions including firewall management, intrusion detection, and secure network architecture.',
      features: ['Firewall Management', 'IDS/IPS Setup', 'Network Monitoring', 'Secure Architecture'],
      price: 'Starting at $3,500'
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
              Our Services
            </h1>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions designed to protect your business
              from the evolving landscape of digital threats.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glow-box bg-cyber-gray/50 p-8 rounded-lg border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300"
              >
                <service.icon className="h-16 w-16 text-cyber-blue mb-6" />
                <h3 className="text-2xl font-tech font-bold text-cyber-light mb-4">
                  {service.title}
                </h3>
                <p className="text-cyber-light/70 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-cyber-light/60 text-sm flex items-center">
                      <div className="w-1 h-1 bg-cyber-blue rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-cyber-blue font-tech font-semibold">
                    {service.price}
                  </span>
                  <CyberButton>
                    Learn More
                  </CyberButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Process
            </h2>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              A systematic approach to cybersecurity that ensures comprehensive protection
              and continuous improvement of your security posture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Assessment', description: 'Comprehensive analysis of your current security infrastructure and risk profile.' },
              { step: '02', title: 'Planning', description: 'Development of a customized security strategy tailored to your specific needs.' },
              { step: '03', title: 'Implementation', description: 'Deployment of security solutions with minimal disruption to your operations.' },
              { step: '04', title: 'Monitoring', description: 'Continuous monitoring and optimization to ensure ongoing protection.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-6xl font-cyber font-bold text-cyber-blue/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-tech font-semibold text-cyber-light mb-3">
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

export default Services;
