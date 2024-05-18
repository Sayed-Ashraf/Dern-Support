import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { decode } from 'punycode';

const CreateFeedback = () => {
  const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"))
  const [values, setValues] = useState({
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    let errors = [];

    if (!values.description) {
      errors.push('Enter a valid description (at least 10 characters)');
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

    const feedbackData = {
      description: values.description,
      user_id: decoded.id
    };

    axios
      .post('http://localhost:5010/feedbacks/add', feedbackData, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success('Feedback added successfully');
          navigate('/feedbacks');
        } else {
          toast.error('Failed to add the feedback');
        }
      })
      .catch((err) => {
        toast.error(`Can't add the feedback: ${err.response ? err.response.data : err.message}`);
      });

    setValues({
      description: '',
    });
  };

  return (
    <div className='vh-300 mt-5 mb-5 w-100 d-flex justify-content-center align-items-center'>
      <form className='w-50' onSubmit={handleSubmit}>
        <h1 className='text-center' style={{ fontSize: '30px' }}>
          Add Feedback
        </h1>
        <div className='form-group mt-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            name='description'
            id='description'
            className='form-control'
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3 text-center'>
          <input type='submit' className='btn btn-primary' value='Add Feedback' />
        </div>
        <Toaster position='bottom-right' reverseOrder={false} />
      </form>
    </div>
  );
};

export default CreateFeedback;
