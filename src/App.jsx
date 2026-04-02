import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './COMPONENTS/Navbar'
import Home from './PAGES/Home'
import LandingPage from './PAGES/LandingPage'
import Favorites from './PAGES/Favorites'
import WatchHistory from './PAGES/WatchHistory'
import Genre from './PAGES/Genre'
import Action from './GENRE/Action'
import Comedy from './GENRE/Comedy'
import Drama from './GENRE/Drama'
import Adventure from './GENRE/Adventure'
import Trending from './PAGES/Trending'
import Crime from './GENRE/Crime'
import Horror from './GENRE/Horror'
import Thriller from './GENRE/Thriller'
import TopRatedMovie from './COMPONENTS/TopRatedMovie'
import UserRating from './PAGES/UserRating'
import UserReview from './PAGES/UserReview'
import Auth from './PAGES/Auth'
import ProtectedRoute from './COMPONENTS/ProtectedRoutes'
import AdminDashboard from './DashboardPage/AdminDashboard'
import AdminNavbar from './COMPONENTS/AdminNavbar'
import AdminUsers from './DashboardPage/AdminUser'
import AdminAllmovies from './DashboardPage/AdminAllmovies'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";









function App() {
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <>
      {isAdminPage ? (
        <AdminNavbar />
      ) : (
        <Navbar isLandingPage={isLandingPage} />
      )}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />

        <Route path='/genre' element={<Genre />}>
          <Route index element={<Action />} />
          <Route path='action' element={<Action />} />
          <Route path='comedy' element={<Comedy />} />
          <Route path='drama' element={<Drama />} />
          <Route path='adventure' element={<Adventure />} />
          <Route path='crime' element={<Crime />} />
          <Route path='horror' element={<Horror />} />
          <Route path='thriller' element={<Thriller />} />
        </Route>

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <WatchHistory />
            </ProtectedRoute>
          }
        />
        <Route path='/trending' element={<Trending />} />
        <Route path='/toprated' element={<TopRatedMovie />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/rate" element={<UserRating />} />
        <Route path="/reviews" element={<UserReview />} />


        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-user" element={<AdminUsers />} />
        <Route path="/admin-movie" element={<AdminAllmovies />} />


      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />

    </>
  )
}

export default App