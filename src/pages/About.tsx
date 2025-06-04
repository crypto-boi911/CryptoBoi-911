
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Globe, Zap } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Alex Chen',
      role: 'Chief Security Officer',
      experience: '15+ years',
      specialization: 'Penetration Testing & Threat Intelligence',
    },
    {
      name: 'Sarah Rodriguez',
      role: 'Lead Security Engineer',
      experience: '12+ years',
      specialization: 'Network Security & Incident Response',
    },
    {
      name: 'Marcus Johnson',
      role: 'Cybersecurity Consultant',
      experience: '10+ years',
      specialization: 'Compliance & Risk Assessment',
    },
    {
      name: 'Dr. Elena Kowalski',
      role: 'Research Director',
      experience: '18+ years',
      specialization: 'AI Security & Cryptography',
    },
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in cybersecurity, continuously innovating to stay ahead of emerging threats.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners, understanding their unique needs and challenges.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Our solutions protect organizations worldwide, adapting to local regulations and threat landscapes.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We leverage cutting-edge technologies and methodologies to provide superior protection.',
    },
  ];

  const milestones = [
    { year: '2018', event: 'CyberKrypt Founded', description: 'Started with a vision to democratize enterprise-grade cybersecurity' },
    { year: '2019', event: 'First 100 Clients', description: 'Reached our first major milestone in client acquisition' },
    { year: '2020', event: 'AI Integration', description: 'Launched our first AI-powered threat detection system' },
    { year: '2021', event: 'Global Expansion', description: 'Expanded operations to serve clients across 15 countries' },
    { year: '2022', event: 'Industry Recognition', description: 'Received multiple cybersecurity innovation awards' },
    { year: '2023', event: 'Advanced Platform', description: 'Released next-generation security platform with quantum encryption' },
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-cyber font-bold text-cyber-blue mb-6">
              About CyberKrypt
            </h1>
            <p className="text-xl text-cyber-light/70 max-w-4xl mx-auto">
              Founded by cybersecurity experts with decades of combined experience, CyberKrypt
              is dedicated to protecting organizations from the evolving landscape of cyber threats.
              We combine cutting-edge technology with human expertise to deliver comprehensive
              security solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-cyber font-bold text-cyber-blue mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-cyber-light/70 mb-6">
                To democratize enterprise-grade cybersecurity by making advanced protection
                accessible to organizations of all sizes. We believe that every business
                deserves the highest level of security, regardless of their size or budget.
              </p>
              <p className="text-lg text-cyber-light/70">
                Through innovation, education, and unwavering commitment to excellence,
                we're building a safer digital world for everyone.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glow-box bg-cyber-gray/30 p-8 rounded-lg border border-cyber-blue/20"
            >
              <h3 className="text-2xl font-tech font-bold text-cyber-light mb-4">
                Why We Started
              </h3>
              <p className="text-cyber-light/70 mb-4">
                After witnessing countless organizations fall victim to preventable
                cyber attacks, our founders recognized the need for accessible,
                comprehensive cybersecurity solutions.
              </p>
              <p className="text-cyber-light/70">
                CyberKrypt was born from the belief that superior cybersecurity
                shouldn't be a luxury reserved for large enterprises.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-cyber font-bold text-cyber-blue mb-6">
              Our Values
            </h2>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we
              approach cybersecurity challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <value.icon className="h-16 w-16 text-cyber-blue mx-auto mb-4" />
                <h3 className="text-xl font-tech font-bold text-cyber-light mb-3">
                  {value.title}
                </h3>
                <p className="text-cyber-light/70">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-cyber font-bold text-cyber-blue mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              Our team brings together decades of experience in cybersecurity,
              technology, and business leadership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glow-box bg-cyber-gray/30 p-6 rounded-lg border border-cyber-blue/20 text-center"
              >
                <div className="w-20 h-20 bg-cyber-blue/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-cyber-blue" />
                </div>
                <h3 className="text-xl font-tech font-bold text-cyber-light mb-2">
                  {member.name}
                </h3>
                <p className="text-cyber-blue font-tech mb-2">
                  {member.role}
                </p>
                <p className="text-cyber-light/60 text-sm mb-2">
                  {member.experience}
                </p>
                <p className="text-cyber-light/70 text-sm">
                  {member.specialization}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-cyber font-bold text-cyber-blue mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              From startup to industry leader, here are the key milestones
              in CyberKrypt's evolution.
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="text-3xl font-cyber font-bold text-cyber-blue mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-tech font-bold text-cyber-light mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-cyber-light/70">
                    {milestone.description}
                  </p>
                </div>
                <div className="w-4 h-4 bg-cyber-blue rounded-full relative">
                  <div className="absolute inset-0 bg-cyber-blue rounded-full animate-ping"></div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
