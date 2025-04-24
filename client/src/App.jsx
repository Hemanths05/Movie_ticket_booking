import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AuthProvider from './context/AuthProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Register';
import MovieDetail from './pages/MovieDetail';
// import SeatSelection from './pages/SeatSelection';
// import Payment from './pages/Payment';
// import Bookings from './pages/Bookings';
// import Admin from './pages/Admin';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              {/*
              <Route path="/booking/:id" element={<SeatSelection />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/admin" element={<Admin />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
};

export default App;
