import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../Components/Hook/useAuth';
import { jwtDecode } from 'jwt-decode';

const UserDetails = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const {deleteUser} = useAuth();
  const id = decoded.id;
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5010/users/${id}`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const user = res.data;
        setValues({
          username: user.username,
          email: user.email,
          password: '',
        });
      })
      .catch((err) => {
        toast.error(`Failed to fetch user: ${err.response ? err.response.data : err.message}`);
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

    const userData = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    axios
      .put(`http://localhost:5010/users/${id}/update`, userData, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('User updated successfully');
          navigate('/');
        } else {
          toast.error('Failed to update the user');
        }
      })
      .catch((err) => {
        toast.error(`Can't update the user: ${err.response ? err.response.data : err.message}`);
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
          User Details
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
          <input type='submit' className='btn btn-success' value='Update'/>
          <input type='submit' className='btn btn-danger ml-3' value='Delete' onClick={() => {deleteUser(id)}}/>
        </div>
        <Toaster position='bottom-right' reverseOrder={false} />
      </form>
    </div>
  );
};

export default UserDetails;