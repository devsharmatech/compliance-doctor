'use client';

import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ContactUs() {
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Our Office",
      details: "123 Greenway Blvd, Suite 100, YourCity, India",
      description: "Come say hello and meet our team!",
      color: "from-blue-700 to-blue-800"
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: "support@yourcompany.com",
      description: "We respond within 24 hours",
      color: "from-blue-700 to-blue-800"
    },
    {
      icon: FaPhone,
      title: "Call Us",
      details: "+91 98765 43210",
      description: "Mon-Fri, 9AM - 6PM",
      color: "from-blue-700 to-blue-800"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      details: "+91 98765 43210",
      description: "24/7 quick support",
      color: "from-blue-700 to-blue-800"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 lg:py-24 px-4 sm:px-6 lg:px-16">
      {/* Heading Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-16 lg:mb-20"
      >
        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide mb-4">
          Get In Touch
        </span>
        <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6">
          We're Here to <span className="text-blue-700">Help You</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Have questions or need assistance? Our team is ready to provide you with exceptional support and answer all your inquiries promptly.
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-8xl mx-auto mb-16 lg:mb-20"
      >
        {contactInfo.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Gradient Border Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className="relative p-6 lg:p-8 flex flex-col h-full">
              {/* Icon with Gradient Background */}
              <div className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="text-white text-2xl" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-700 font-semibold text-lg mb-2">
                {item.details}
              </p>
              
              <p className="text-gray-600 text-sm leading-relaxed mt-auto">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Form & Map Section */}
      <div className="grid grid-cols-1  max-w-8xl mx-auto">
        

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl" style={{ height: '400px' }}
        >
          <iframe
            title="Our Office Location"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.986442764774!2d77.59425431482105!3d12.908690190893997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1512bff5f43d%3A0x49a9b6e38c2d1c99!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1622291600910"
          ></iframe>
          
          {/* Map Overlay Info */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-2 rounded-full">
                <FaMapMarkerAlt className="text-white text-sm" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Our Office</p>
                <p className="text-sm text-gray-600">Bangalore, Karnataka</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-16 lg:mt-20"
      >
        <div className="inline-flex items-center gap-2 bg-blue-100 px-6 py-3 rounded-full">
          <FaClock className="text-blue-600" />
          <span className="text-blue-700 font-semibold">Emergency Support: 24/7 Available</span>
        </div>
      </motion.div>
    </section>
  );
}