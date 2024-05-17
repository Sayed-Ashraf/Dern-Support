import React from 'react'
import {Link } from "react-router-dom"
import { Button } from "../../../src/Components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "../../../src/Components/ui/dropdown-menu"
import useAuth  from '../Hook/useAuth'
import { jwtDecode } from 'jwt-decode'

const Navbar = () => {
    const {logout} = useAuth();
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

if (token && typeof token === 'string') {
  try {
    var userData = jwtDecode(token); // Decode only if token is a string
    // Use userData here
  } catch (error) {
    console.error('Error decoding token:', error);
    // Handle decoding error (e.g., invalid token format)
  }
} else {
  console.warn('No token found or invalid token type');
  // Handle the case where there's no token or it's not a string
}
  return (
    <header className="flex justify-between cob h-14 items-center border-b px-4 p-3">
    <Link className="flex items-center gap-2 font-semibold" to={"/"}>
      <LockIcon className="h-6 w-6" />
      <span className=""><span style={{color: "#22c55e", fontWeight: 800}}>Dern</span> Support</span>
    </Link>
    <div className='ml-5'>
      <Link to={"/services"} className="">Services</Link>
    </div>
    <div className='ml-5'>
      <Link to={"/faqs"} className="">FAQs</Link>
    </div>
    <div className='ml-5'>
      <Link to={"/feedbacks"} className="">Feedbacks</Link>
    </div>
          {
              localStorage.getItem("token")?<div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full w-8 h-8" size="icon" variant="ghost">
                    <UserIcon className="w-4 h-4" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link to="/UserDetails">User Details</Link>
                  </DropdownMenuItem>
                  {userData.role == "admin" ? <DropdownMenuItem><Link to={"/dashboard"}>Dashboard</Link></DropdownMenuItem>:<></>}
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>:<Button className="ml-auto" size="sm" ><Link to={'/login'}>Login</Link></Button>
          }
  </header>
  )
}
function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
  function UserIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  }
  
export default Navbar