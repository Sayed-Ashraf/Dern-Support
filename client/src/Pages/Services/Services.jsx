import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Services = () => {
  const [services, setServices] = React.useState([]);
  // const decoded = jwtDecode(localStorage.getItem('token'));

  const getServices = async () => {
    const response = await axios.get('http://localhost:5010/services', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });
    setServices(response.data);
  };

  React.useEffect(() => {
    getServices();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-between">
          {   services && 
          services
                .map((service, index) => (
                  <div className="card text-center w-25 p-3 mt-5 mr-3" key={index}>
                    <div className="card-body">
                      <h1 className="card-title"><span style={{fontWeight: "700"}}>Title:</span> {service.title}</h1>
                      <p className="card-content"><span style={{fontWeight: "700"}}>Description:</span> {service.description}</p>
                      <p className="card-content"><span style={{fontWeight: "700"}}>Category:</span> {service.category_name}</p>
                      <Link to={`#`} className="btn btn-primary mt-3">Order</Link>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
