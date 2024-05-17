import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateService = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [values, setValues] = useState({
    title: '',
    description: '',
    category_name: '',
  });

  useEffect(() => {
    // Fetch the existing service data and populate the form
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`http://localhost:5010/services/${id}`, {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            }
          }); // Replace 1 with the actual service ID
        const { title, description, category_name } = response.data.service;
        setValues({ title, description, category_name });
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch service data');
      }
    };

    fetchServiceData();
  }, []);

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
      .put(`http://localhost:5010/services/${id}/update`, serviceData, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      }) // Replace 1 with the actual service ID
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success('Service updated successfully');
          navigate('/dashboard');
        } else {
          toast.error('Failed to update the service');
        }
      })
      .catch((err) => {
        toast.error(`Can't update the service: ${err.response ? err.response.data : err.message}`);
      });
  };

  return (
    <div className='vh-300 mt-5 mb-5 w-100 d-flex justify-content-center align-items-center'>
      <form className='w-50' onSubmit={handleSubmit}>
        <h1 className='text-center' style={{ fontSize: '30px' }}>
          Update Service
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
          <select
            className='form-select'
            name='category_name'
            value={values.category_name}
            onChange={handleChange}
          >
            <option value=''>Select a category</option>
            <option value='Hardware'>Hardware</option>
            <option value='Software'>Software</option>
          </select>
        </div>
        <div className='mt-3 text-center'>
          <input type='submit' className='btn btn-primary' value='Update Service' />
        </div>
        <Toaster position='bottom-right' reverseOrder={false} />
      </form>
    </div>
  );
};

export default UpdateService;