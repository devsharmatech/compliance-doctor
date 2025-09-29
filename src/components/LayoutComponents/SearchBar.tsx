
'use client';
import { useState, useRef, useEffect } from 'react';
import { useSearchServicesQuery } from '@/store/api-services/service-api';
import { BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

// Custom debounce hook
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar: React.FC<SearchBarProps> = ({ isMobile = false, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectFields, setSelectFields] = useState<string[]>(['name', 'description']);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Debounce the input value
  const debouncedQuery = useDebounce(inputValue, 300);

  // Fetch search results using RTK Query
  const { data: services = [], isLoading, isError } = useSearchServicesQuery(
    { query: debouncedQuery, selectFields },
    { skip: !debouncedQuery || debouncedQuery.length < 2 } // Skip query if less than 2 characters
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update showResults based on debouncedQuery
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [debouncedQuery]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle form submission (e.g., Enter key)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedQuery) {
      // Navigate to a search results page
      router.push(`/search?query=${encodeURIComponent(debouncedQuery)}`);
      setShowResults(false);
      if (onClose) onClose();
    }
  };

  // Handle select fields change
  const toggleSelectField = (field: string) => {
    setSelectFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  return (
    <div className={`relative ${isMobile ? 'w-full' : 'max-w-2xl w-full mx-5'}`} ref={dropdownRef}>
      <form onSubmit={handleSubmit} className={`flex items-center rounded-full border ${isMobile ? 'bg-white shadow-lg p-3' : ''}`}>
        <input
          type="text"
          placeholder="Try Registration Services"
          value={inputValue}
          onChange={handleInputChange}
          className={`flex-1 ${isMobile ? 'bg-transparent' : 'px-6 py-1'} text-gray-800 placeholder-gray-600 focus:outline-none`}
        />
        <button type="submit" className="p-4">
          <BiSearch className="text-gray-800 text-xl" />
        </button>
      </form>

      {/* Optional: Select fields dropdown (for advanced search) */}
      {/* <div className="absolute top-12 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-50">
        <div className="p-2">
          {['name', 'description'].map((field) => (
            <label key={field} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectFields.includes(field)}
                onChange={() => toggleSelectField(field)}
                className="form-checkbox"
              />
              <span className="text-sm capitalize">{field}</span>
            </label>
          ))}
        </div>
      </div> */}

      {/* Search results dropdown */}
      {showResults && debouncedQuery.length >= 2 && (
        <div className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-gray-500">Loading...</div>
          ) : isError ? (
            <div className="p-4 text-red-500">Error loading results</div>
          ) : services.length === 0 ? (
            <div className="p-4 text-gray-500">No results found</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {services.map((service: any) => (
                <Link key={service._id} href={`/services/${service.slug}`}>
                  <li
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setShowResults(false);
                      if (onClose) onClose();
                    }}
                  >
                    <div className="font-medium text-gray-800">{service.name}</div>
                    <div className="text-sm text-gray-500 truncate" dangerouslySetInnerHTML={{__html:service.description?.slice(0,200)}}/>
                    {service.category && (
                      <div className="text-xs text-gray-400">{service.category.name}</div>
                    )}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;