import React, { useState } from 'react';
import './Register.css';
import img from '../../../assets/Why-ITSM-is-integral-in-enterprise-wide-digitisation.jpg';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../Components/Hook/useAuth'; // Import useAuth hook
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const { register } = useAuth();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateForm = () => {
    let errors = [];

    // Validate username
    if (!values.username || values.username.length < 5 || values.username.length > 255) {
      errors.push('Enter a valid username (at least 6 characters, max 255 characters)');
    }

    // Validate email
    if (!values.email || values.email.length > 255) {
      errors.push('Enter a valid email (max 255 characters)');
    }

    // Validate password
    if (!values.password || values.password.length < 8 || values.password.length > 255) {
      errors.push('Enter a valid password (at least 8 characters, max 255 characters)');
    }

    // Display errors if any
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log('Submitting values:', values); // Log the values being submitted
      await register(values.username, values.email, values.password);
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }

    setValues({ username: '', email: '', password: '' });
  };

  return (
    <div className="con">
      <div className="reg-con w-75">
        <div className="form">
          <header style={{ paddingTop: '50px' }}>Register</header>
          <form className="mt-4" style={{ marginLeft: '50px' }} onSubmit={handleSubmit}>
            <div className="sec-1 col-md-6 col-12 col-sm-12">
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  className="reg-name"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="reg-email"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={values.password}
                  onChange={handleChange}
                  className="reg-password"
                />
              </div>
            </div>
            <section>
              <input type="submit" value="Register" className="submit" />
            </section>
          </form>
          <div className="msg">
            Already have an account <Link to="/login" className='text-primary underline'>Login</Link> now!
          </div>
        </div>
        <div className="reg-img">
          <img src={img} alt="" />
        </div>
        <>
          <Toaster position="bottom-right" reverseOrder={false} />
        </>
      </div>
    </div>
  );
};

export default Register;
