import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateService = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: '',
    description: '', 
    category_name: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    let errors = [];

    if (!values.title || values.title.length < 6 || values.title.length > 255) {
      errors.push('Enter a valid title (at least 6 characters, max 255 characters)');
    }

    if (!values.description || values.description.length < 6 || values.description.length > 255) {
      errors.push('Enter a valid description (at least 6 characters, max 255 characters)');
    }

    if (!values.category_name) {
      errors.push('Select a category');
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

    const serviceData = {
      title: values.title,
      description: values.description,
      category_name: values.category_name,
    };

    axios
      .post('http://localhost:5010/services/add', serviceData, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success('Service added successfully');
          navigate('/dashboard');
        } else {
          toast.error('Failed to add the service');
        }
      })
      .catch((err) => {
        toast.error(`Can't add the service: ${err.response ? err.response.data : err.message}`);
      });

    setValues({
      title: '',
      description: '',
      category_name: '',
    });
  };

  return (
    <div className='vh-300 mt-5 mb-5 w-100 d-flex justify-content-center align-items-center'>
      <form className='w-50' onSubmit={handleSubmit}>
        <h1 className='text-center' style={{ fontSize: '30px' }}>
          Add Service
        </h1>
        <div className='form-group mt-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            className='form-control'
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className='form-group mt-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            type='text'
            name='description'
            id='description'
            className='form-control'
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <div className='form-group mt-3'>
          <label htmlFor='category_name' className='form-label'>
            Category
          </label>
          <select className='form-select' name='category_name' value={values.category_name} onChange={handleChange}>
            <option value=''>Select a category</option>
            <option value='Hardware'>Hardware</option>
            <option value='Software'>Software</option>
          </select>
        </div>
        <div className='mt-3 text-center'>
          <input type='submit' className='btn btn-primary' value='Add Service' />
        </div>
        <Toaster position='bottom-right' reverseOrder={false} />
      </form>
    </div>
  );
};

export default CreateService;
