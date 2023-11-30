import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';
import { useEffect } from 'react';

const LoginForm = ({ redirectUrl }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();


  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [authState, redirectUrl, isLoggedIn, navigate]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  }



  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className='m-auto my-16 max-w-[500px] bg-white p-8 border-2 shadow-md rounded-md' style={{ background: '#f4f4f4', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4 text-3xl font-bold text-gray-800'>Please login here</h2>
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
              <Link to="/signup" className='text-blue-400 text-sm'>Don't have an account? Signup here</Link>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default LoginForm