// // components/ExpertiseTabs.js
// 'use client';

// import { useState } from 'react';

// const tabs = [
//   { title: 'Legal Notices', content: ['Clear and concise drafting', 'Tailor made notices', 'Quick filing', 'Timely response', 'Top lawyer support'] },
//   { title: 'Employment Issues', content: ['Employment contracts', 'Termination disputes', 'Labor law compliance'] },
//   { title: 'Property Succession', content: ['Will drafting', 'Legal heir certificates', 'Succession certificate filing'] },
//   { title: 'Property Registration', content: ['Sale deed drafting', 'Stamp duty assistance', 'Online registration help'] },
//   { title: 'Property Verification', content: ['Title check', 'Ownership verification', 'Encumbrance certificate'] },
//   { title: 'Cheque Bounce Cases', content: ['Notice drafting', 'Filing complaint', 'Court representation'] },
// ];

// export default function ExpertiseTabs() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <div className="flex flex-col md:flex-row mx-auto mt-12 rounded shadow-sm bg-white">
//       <div className="w-full md:w-1/3 space-y-2 mb-4 md:mb-0">
//         {tabs.map((tab, index) => (
//           <button
//             key={index}
//             onClick={() => setActiveIndex(index)}
//             className={`w-full text-left px-4 py-2 border-gray-300 rounded transition ${
//               index === activeIndex ? 'bg-blue-100 font-semibold border-blue-500' : 'bg-gray-100 hover:bg-blue-50'
//             }`}
//           >
//             {tab.title}
//           </button>
//         ))}
//       </div>

//       <div className="w-full md:w-2/3 pl-4 p-3">
//         <h2 className="text-xl font-bold mb-4">{tabs[activeIndex].title}</h2>
//         <ul className="list-disc pl-6 space-y-1 text-gray-700">
//           {tabs[activeIndex].content.map((item, i) => (
//             <li key={i} className="flex items-start gap-2">
//               <span>✔️</span>
//               <span>{item}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";

export default function ExpertiseTabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!tabs || tabs.length === 0) return <p>No expertise data available.</p>;

  return (
    <div className="flex flex-col md:flex-row gap-5 bg-white w-auto md:w-[1200px] p-5 mx-auto mt-12 advantage">
      <div className="w-full md:w-[387px] space-y-3 mb-4 md:mb-0">
        {tabs.map((tab, index) => (
          <button
            key={index}
            id={`tab-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`w-full md:w-[386px] text-left px-4 py-2 rounded transition  ${
              index === activeIndex ? 'bg-[#0C1819] text-white text-[16px]' : 'bg-[#FAFAFA]'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="w-full md:w-[741px] pl-10 p-3 bg-[#FAFAFA] ">
        <h2 className="text-xl font-bold mb-4">{tabs[activeIndex].title}</h2>
        <ul className="list-disc space-y-1 text-gray-700">
          {tabs[activeIndex].content.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span><FaCheckCircle/></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

