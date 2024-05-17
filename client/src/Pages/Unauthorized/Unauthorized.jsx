import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <>
      <Navbar/>
    <div className="flex h-[100dvh] flex-col items-center justify-center space-y-6 px-4 text-center">
  <div className="text-9xl font-bold text-gray-900 dark:text-gray-50">404</div>
  <div className="space-y-2">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
      Unauthorized Access
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      You don't have permission to access this page.
    </p>
  </div>
  <Link
    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
    to="/"
  >
    Go back home
  </Link>
</div>
    </>
  )
}

export default Unauthorized