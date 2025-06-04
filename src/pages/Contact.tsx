
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import CyberButton from '../components/CyberButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      info: 'info@cyberkrypt.com',
      description: 'Send us an email anytime',
    },
    {
      icon: Phone,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      description: '24/7 emergency support',
    },
    {
      icon: MapPin,
      title: 'Office',
      info: 'San Francisco, CA',
      description: 'Visit our headquarters',
    },
    {
      icon: Clock,
      title: 'Response Time',
      info: 'Within 15 minutes',
      description: 'Emergency incidents',
    },
  ];

  const services = [
    'Penetration Testing',
    'Threat Intelligence',
    'Security Audits',
    'Incident Response',
    'Vulnerability Assessment',
    'Security Training',
    'Data Protection',
    'Network Security',
    'General Inquiry',
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
              Contact Us
            </h1>
            <p className="text-xl text-cyber-light/70 max-w-3xl mx-auto">
              Ready to secure your digital assets? Get in touch with our cybersecurity
              experts for a consultation tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glow-box bg-cyber-gray/30 p-6 rounded-lg border border-cyber-blue/20 text-center"
              >
                <item.icon className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
                <h3 className="text-lg font-tech font-bold text-cyber-light mb-2">
                  {item.title}
                </h3>
                <p className="text-cyber-blue font-tech mb-1">
                  {item.info}
                </p>
                <p className="text-cyber-light/60 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glow-box bg-cyber-gray/30 p-8 rounded-lg border border-cyber-blue/20"
            >
              <h2 className="text-3xl font-cyber font-bold text-cyber-blue mb-6">
                Get a Free Consultation
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-cyber-light font-tech mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-cyber-darker border border-cyber-blue/30 rounded-lg text-cyber-light focus:border-cyber-blue focus:outline-none transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-cyber-light font-tech mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-cyber-darker border border-cyber-blue/30 rounded-lg text-cyber-light focus:border-cyber-blue focus:outline-none transition-colors duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-cyber-light font-tech mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cyber-darker border border-cyber-blue/30 rounded-lg text-cyber-light focus:border-cyber-blue focus:outline-none transition-colors duration-300"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-cyber-light font-tech mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cyber-darker border border-cyber-blue/30 rounded-lg text-cyber-light focus:border-cyber-blue focus:outline-none transition-colors duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-cyber-light font-tech mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-cyber-darker border border-cyber-blue/30 rounded-lg text-cyber-light focus:border-cyber-blue focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-cyber-light font-tech mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-cyber-darker border border-cyber-blue/30 rounded-lg text-cyber-light focus:border-cyber-blue focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your cybersecurity needs..."
                  />
                </div>

                <CyberButton>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </CyberButton>
              </form>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glow-box bg-cyber-gray/30 p-8 rounded-lg border border-cyber-blue/20">
                <h3 className="text-2xl font-tech font-bold text-cyber-blue mb-4">
                  Emergency Response
                </h3>
                <p className="text-cyber-light/70 mb-4">
                  Experiencing a cybersecurity incident? Our emergency response team
                  is available 24/7 to help contain and mitigate threats.
                </p>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-cyber-red" />
                  <span className="text-cyber-red font-tech font-semibold">
                    Emergency Hotline: +1 (555) CYBER-911
                  </span>
                </div>
              </div>

              <div className="glow-box bg-cyber-gray/30 p-8 rounded-lg border border-cyber-blue/20">
                <h3 className="text-2xl font-tech font-bold text-cyber-blue mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3 text-cyber-light/70">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 mr-3"></div>
                    <span>Response within 15 minutes for emergency incidents</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 mr-3"></div>
                    <span>Free initial consultation and risk assessment</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 mr-3"></div>
                    <span>Customized security recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 mr-3"></div>
                    <span>Transparent pricing with no hidden fees</span>
                  </li>
                </ul>
              </div>

              <div className="glow-box bg-cyber-gray/30 p-8 rounded-lg border border-cyber-blue/20">
                <h3 className="text-2xl font-tech font-bold text-cyber-blue mb-4">
                  Office Hours
                </h3>
                <div className="space-y-2 text-cyber-light/70">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Emergency Only</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-cyber-blue/20">
                    <span className="text-cyber-blue font-tech">
                      24/7 Emergency Support Available
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
