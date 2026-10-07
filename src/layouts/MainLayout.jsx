import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout