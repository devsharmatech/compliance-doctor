'use client';
import "./servicehero.css";

export default function ServicesHero() {
  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="relative w-full min-h-[300px] md:min-h-[300px] bg-gradient-to-br from-blue-700 via-blue-800 to-blue-800 text-white flex flex-col items-center justify-center px-6 py-20 md:py-20 text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Our <span className="text-blue-100">Services</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 leading-relaxed" style={{color:"#fff"}}>
            Comprehensive business solutions for Indian startups and enterprises
          </p>
          <div className="w-24 h-1.5 bg-blue-400 mx-auto rounded-full mb-4"></div>
          <div className="w-16 h-1.5 bg-blue-300 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        {/* Startup Services */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-24 lg:mb-32">
            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-green-100 rounded-3xl transform rotate-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <img 
                  src="/images/s1.jpg" 
                  alt="Startup Services" 
                  className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 ease-out"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-6 lg:w-5/12 w-full">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold w-fit shadow-sm border border-blue-200">
                🚀 Startup Services
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                End-to-End Startup Solutions
              </h3>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                Launch your business with confidence. We provide complete startup registration services including 
                Private Limited Company, LLP Registration, One Person Company, and Startup India Recognition. 
                Get expert guidance on compliance, funding, and growth strategies tailored for Indian startups.
              </p>
              <ul className="space-y-3">
                {['Company Incorporation', 'LLP Registration', 'Startup India Registration', 'Compliance Management'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-blue-700 font-medium">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
            </div>
          </div>

          {/* Trademark Services */}
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-16 mb-24 lg:mb-32">
            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-green-100 rounded-3xl transform -rotate-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <img 
                  src="/images/s21.png" 
                  alt="Trademark Services" 
                  className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 ease-out"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-6 lg:w-5/12 w-full">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold w-fit shadow-sm border border-blue-200">
                🛡️ Intellectual Property
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Trademark & Brand Protection
              </h3>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                Protect your brand identity with our comprehensive trademark registration services. We handle 
                trademark search, application filing, objection handling, and registration across India. 
                Secure your intellectual property rights with our expert legal guidance.
              </p>
              <ul className="space-y-3">
                {['Trademark Registration', 'Brand Name Search', 'IPR Consultation', 'Trademark Renewal'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-blue-700 font-medium">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
            </div>
          </div>

          {/* MCA Services */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-24 lg:mb-32">
            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-green-100 rounded-3xl transform rotate-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <img 
                  src="/images/s3.png" 
                  alt="MCA Services" 
                  className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 ease-out"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-6 lg:w-5/12 w-full">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold w-fit shadow-sm border border-blue-200">
                📊 Corporate Compliance
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Ministry of Corporate Affairs Compliance
              </h3>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                Stay compliant with MCA regulations effortlessly. Our services include annual filings, 
                director KYC, form submissions, ROC compliance, and corporate governance advisory. 
                Ensure your business meets all statutory requirements seamlessly.
              </p>
              <ul className="space-y-3">
                {['Annual ROC Filings', 'Director DIN KYC', 'Company Name Change', 'Corporate Governance'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-blue-700 font-medium">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              
            </div>
          </div>

          {/* Income Tax Services */}
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-16">
            <div className="lg:w-1/2 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-green-100 rounded-3xl transform -rotate-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <img 
                  src="/images/s4.png" 
                  alt="Income Tax Services" 
                  className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 ease-out"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-6 lg:w-5/12 w-full">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold w-fit shadow-sm border border-blue-200">
                💰 Taxation
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Income Tax & GST Services
              </h3>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                Optimize your tax strategy with our expert income tax and GST services. From tax planning 
                and return filing to GST registration and compliance, we help you navigate India's complex 
                tax landscape while maximizing your savings and minimizing liabilities.
              </p>
              <ul className="space-y-3">
                {['Income Tax Return Filing', 'GST Registration & Returns', 'Tax Planning & Advisory', 'TDS Compliance'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-blue-700 font-medium">
                    <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
             
            </div>
          </div>
        </div>
      </section>

    </>
  );
}