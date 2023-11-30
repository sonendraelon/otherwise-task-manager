import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });
  }

  const fieldError = field => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className='m-auto my-16 max-w-[500px] p-8 bg-white border-2 shadow-md rounded-md' style={{ background: '#f4f4f4', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4 text-3xl font-bold text-gray-800'>Welcome user, please signup here</h2>
            <div className="mb-4">
              <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 font-medium">Name</label>
              <Input type="text" name="name" id="name" value={formData.name} placeholder="Your name" onChange={handleChange} style={{ border: '1px solid #d1d1d1', borderRadius: '4px', padding: '10px', width: '100%', fontSize: '16px' }} />
              {fieldError("name")}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 font-medium">Email</label>
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} style={{ border: '1px solid #d1d1d1', borderRadius: '4px', padding: '10px', width: '100%', fontSize: '16px' }} />
              {fieldError("email")}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 font-medium">Password</label>
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} style={{ border: '1px solid #d1d1d1', borderRadius: '4px', padding: '10px', width: '100%', fontSize: '16px' }} />
              {fieldError("password")}
            </div>

            <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark rounded-md' onClick={handleSubmit} style={{ background: '#4a90e2', border: 'none', borderRadius: '4px', padding: '12px 20px', fontSize: '16px', cursor: 'pointer' }}>Submit</button>

            <div className='pt-4 text-center'>
              <Link to="/login" className='text-blue-400 text-sm'>Already have an account? Login here</Link>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default SignupForm;