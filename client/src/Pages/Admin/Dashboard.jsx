'use-client'
import * as React from 'react';
import axios from 'axios';
import {Link, useNavigate } from "react-router-dom"
import { Button } from "../../../src/Components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "../../Components/ui/avatar";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../../../src/Components/ui/table"
import Navbar from "../../Components/Navbar/Navbar"
import toast, {Toaster} from 'react-hot-toast'; 

export default function Dashboard() {
    
    // const navigate = useNavigate()
    // React.useEffect(() => {
    //     localStorage.getItem("token") == null ? function(){
    //         window.load
    //         navigate('/home')
    //     } : ''
    // }, [])
  const [services, setServices] = React.useState([]);
  const [feedbacks, setFeedbacks] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [users, setUsers] = React.useState([]);

    const getServices = async() => {
      const response = await axios.get("http://localhost:5010/services", {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      })
      setServices(response.data)
      console.log(response.data);
    }
    const getFeedbacks = async() => {
      const response = await axios.get("http://localhost:5010/feedbacks", {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      })
      setFeedbacks(response.data)
      console.log(response.data);
    }
///////////////////////////////
    const getAdmins = async() => {
      const response = await axios.get("http://localhost:5010/admins", {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      })
      setAdmins(response.data.admins)
    }
///////////////////////////////
  const getUsers = async() => {
    const response = await axios.get("http://localhost:5010/users", {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
    setUsers(response.data)
  }
///////////////////////////////
    React.useEffect(() => {
      getServices()
      getFeedbacks()
      getAdmins()
      getUsers()
    }, [])

    const handleUserDelete = (id) => {
      axios.delete(`http://localhost:5010/users/${id}/delete`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(res => {
        if(res.status == 200){
          toast.success("User deleted successfully")
          location.reload()
        }
      })
      .catch(err => {
        toast.error(err.message)
      })
    }
    const handleAdminDelete = (id) => {
      axios.delete(`http://localhost:5010/admins/${id}/delete`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(res => {
        if(res.status == 200){
          toast.success("Admin deleted successfully")
          location.reload()
        }
      })
      .catch(err => {
        toast.error(err.message)
      })
    }
    const handleServiceDelete = (id) => {
      axios.delete(`http://localhost:5010/services/${id}/delete`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(res => {
        if(res.status == 200){
          toast.success("Service deleted successfully")
          location.reload()
        }
      })
      .catch(err => {
        toast.error(err.message)
      })
    }
    const handleFeedbackDelete = (id) => {
      axios.delete(`http://localhost:5010/feedbacks/${id}/delete`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then(res => {
        if(res.status == 200){
          toast.success("Feedback deleted successfully")
          location.reload()
        }
      })
      .catch(err => {
        toast.error(err.message)
      })
    }
    return (
      <div className="flex h-screen w-full flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col p-4 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-lg md:text-2xl">Services</h1>
            <Button className="ml-auto" size="sm">
              <Link to={'/dashboard/addService'}>Create a Service</Link>
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="hidden md:table-cell">Category Name</TableHead>
                  <TableHead className="hidden md:table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  services && services.map((service, index) =>{
                    return (
                <TableRow className="cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50" key={service.id || index}>
                  <TableCell className="font-semibold">{service.title}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell className="hidden md:table-cell">{service.category_name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Link className="btn btn-success m-1" to={`/dashboard/${service.id}/updateService`}>Update</Link>
                    <Link className="btn btn-danger" onClick={() => {handleServiceDelete(service.id)}}>Delete</Link>
                  </TableCell>
                </TableRow>

                    )
                  }) 
                }
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center gap-4 mt-8">
          <h1 className="font-semibold text-lg md:text-2xl">Feedbacks</h1>
          <Button className="ml-auto" size="sm">
            <Link to={'/dashboard/addFeedback'}>Add a Feedback</Link>
          </Button>
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Username</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map((feedback) => {
                const user = users.find(user => user.id === feedback.user_id);
                return (
                  <TableRow className="cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50" key={feedback.id}>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage alt="User Avatar" src={user?.avatar || '/placeholder-avatar.jpg'} />
                          <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        <div>{user?.username || 'Unknown User'}</div>
                      </div>
                    </TableCell>
                    <TableCell>{feedback.description}</TableCell>
                    <TableCell className="hidden md:table-cell">                    
                    <Link className="btn btn-danger" onClick={() => {handleFeedbackDelete(feedback.id)}}>Delete</Link>
                  </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
          <div className="flex items-center gap-4 mt-8">
            <h1 className="font-semibold text-lg md:text-2xl">Admins</h1>
            <Button className="ml-auto" size="sm">
              <Link to={"/dashboard/addAdmin"}>
                Add admin
              </Link>
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Username</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{
                admins && admins.map((admin, index) => {
                  return (
                <TableRow className="cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50" key={admin.id || index}>
                  <TableCell className="font-semibold">{admin.username}</TableCell>
                  <TableCell className="hidden md:table-cell">{admin.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{admin.role}</TableCell>
                  <TableCell className="hidden md:table-cell">                    
                    <Link className="btn btn-success m-1" to={`/dashboard/updateAdmin/${admin.id}`}>Update</Link>
                    <Link className="btn btn-danger" onClick={() => {handleAdminDelete(admin.id)}}>Delete</Link>
                  </TableCell>
                </TableRow>
                  )
                })
                }
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
            <Button className="ml-auto" size="sm">
              <Link to={"/dashboard/addUser"}>
                Add user
              </Link>
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Username</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  users && users.map((user, index) => {
                    return (
                <TableRow className="cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50" key={user.id || index}>
                  <TableCell className="font-semibold">{user.username}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.role}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Link className="btn btn-success m-1" to={`/dashboard/updateUser/${user.id}`}>Update</Link>
                    <Link className="btn btn-danger" onClick={() => {handleUserDelete(user.id)}}>Delete</Link>
                  </TableCell>
                </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </div>
        </main>
        <Toaster position='bottom-right' reverseOrder={false} />
      </div>
    )
  }
  

  
 