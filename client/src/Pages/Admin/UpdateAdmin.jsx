import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5010/admins/${id}`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const admin = res.data;
        setValues({
          username: admin.username,
          email: admin.email,
          password: '',
        });
      })
      .catch((err) => {
        toast.error(`Failed to fetch admin: ${err.response ? err.response.data : err.message}`);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    let errors = [];

    if (!values.username || values.username.length < 6 || values.username.length > 255) {
      errors.push('Enter a valid username (at least 6 characters, max 255 characters)');
    }

    if (!values.email || !values.email.includes('@')) {
      errors.push('Enter a valid email address');
    }

    if (values.password.length > 0 && values.password.length < 6) {
      errors.push('Enter a valid password (at least 6 characters)');
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const adminData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    axios
      .put(`http://localhost:5010/admins/${id}/update`, adminData, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Admin updated successfully');
          navigate('/dashboard');
        } else {
          toast.error('Failed to update the admin');
        }
      })
      .catch((err) => {
        toast.error(`Can't update the admin: ${err.response ? err.response.data : err.message}`);
      });

    setValues({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className='vh-300 mt-5 mb-5 w-100 d-flex justify-content-center align-items-center'>
      <form className='w-50' onSubmit={handleSubmit}>
        <h1 className='text-center' style={{ fontSize: '30px' }}>
          Update Admin
        </h1>
        <div className='form-group mt-3'>
          <label htmlFor='username' className='form-label'>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            className='form-control'
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div className='form-group mt-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='form-control'
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-group mt-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='form-control'
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3 text-center'>
          <input type='submit' className='btn btn-primary' value='Update Admin' />
        </div>
        <Toaster position='bottom-right' reverseOrder={false} />
      </form>
    </div>
  );
};

export default UpdateAdmin;