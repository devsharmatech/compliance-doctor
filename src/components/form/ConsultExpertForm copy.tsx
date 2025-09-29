import React, { useState, FormEvent } from 'react';

// Define the shape of the form data
interface FormData {
  email: string;
  mobile: string;
  city: string;
  pincode: string;
  firstName:string;
  lastName:string;
}

// Define the shape of the error state
interface FormErrors {
  email?: boolean;
  mobile?: boolean;
  city?: boolean;
  pincode?: boolean;
  firstName?:boolean;
  lastName?:boolean;
}

// Define the component props
interface ConsultExpertFormProps {
  serviceName: string;
  onSubmit: (data: Partial<FormData>) => void;
}

const ConsultExpertForm: React.FC<ConsultExpertFormProps> = ({ serviceName, onSubmit }) => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    email: '',
    mobile: '',
    city: '',
    pincode: '',
    firstName:'',
    lastName:'',
  });

  // State for form errors
  const [error, setError] = useState<FormErrors>({});

  // Handle form submission
  const handleGetStarted = (e: FormEvent) => {
    e.preventDefault();

    // Validate form data
    const newErrors: FormErrors = {
      email: !formData.email,
      mobile: !formData.mobile,
      city: !formData.city,
      pincode: !formData.pincode,
    };
    setError(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((err) => err)) {
      return;
    }

    // Sanitize data: Remove falsy values
    const sanitizedData = Object.fromEntries(
      Object.entries({...formData,plan:serviceName}).filter(([_, val]) => !!val)
    ) as Partial<FormData>;

    // Call the provided onSubmit handler with sanitized data
    onSubmit(sanitizedData);
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 py-6 px-6">
      <div className="text-[18px] text-[#326EE6] font-semibold mb-4 text-center">
        Apply for {serviceName}
      </div>

      <form className="flex flex-col gap-4" id="service-form">
        <div className='grid grid-cols-2 gap-1'>
            <div>
          <label htmlFor="email">First Name</label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="FirstName"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {error.firstName && <div className="text-red-600 text-sm">* FirstName is required</div>}
        </div>

        <div>
          <label htmlFor="lastName">lastName</label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="LastName"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {error.lastName && <div className="text-red-600 text-sm">* LastName is required</div>}
        </div>
        </div>


        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {error.email && <div className="text-red-600 text-sm">* Email is required</div>}
        </div>

        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            placeholder="Mobile Number"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {error.mobile && <div className="text-red-600 text-sm">* Mobile number is required</div>}
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {error.city && <div className="text-red-600 text-sm">* City is required</div>}
        </div>

        <div>
          <label htmlFor="pincode">Pincode</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            placeholder="Pincode"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {error.pincode && <div className="text-red-600 text-sm">* Pincode is required</div>}
        </div>

        <button
          onClick={handleGetStarted}
          className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300  bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
        >
          Consult an Expert
        </button>
      </form>
    </div>
  );
};

export default ConsultExpertForm;