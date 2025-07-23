import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TollStart from './Components/TollStart';
import TollUpload from './Components/TollUpload';
import Home from './Components/Home';
import Guest from './Components/Guest'
import GuestUpload from './Components/GuestUpload';
import GuestDetails from './Components/GuestDetails';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AboutUs from './Components/AboutUs';
import TollLogin from "./Components/TollSignIn";
import Statistics from './Components/Statistics';
import Loader from './Components/Loader';
import CheckRecords from './Components/TollCheckRecords';
import NoAccess from './Components/NoAccess';
import './all_css/Home.css';
import './all_css/Loader.css';
import './stylesheet.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const NotFound = (props) => (
  <h1>404 Error.
    The page you are looking for does not exist
  </h1>)

// Helper to check for tollLogin cookie
function hasTollLoginCookie() {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((item) => item.trim().startsWith('tollLogin='));
}


function App() {
  const [selectedToll, setSelectedToll] = useState('');
  const [signInButton, setSignInButton] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(hasTollLoginCookie());

  // useEffect(() => {
  //   const storedToll = localStorage.getItem('selectedToll');
  //   if (storedToll) {
  //     setSelectedToll(storedToll);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('selectedToll', selectedToll);
  // }, [selectedToll]);

  // // Listen for cookie changes (e.g., login/logout)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIsAuthenticated(hasTollLoginCookie());
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // The two most important states for auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To prevent content flashing

  useEffect(() => {
    localStorage.setItem('selectedToll', selectedToll);
  }, [selectedToll]);


  // THIS IS THE CORRECT WAY TO CHECK AUTHENTICATION ON PAGE LOAD
  useEffect(() => {
    // This async function will ask the backend if our cookie is valid
    const verifyUser = async () => {
      try {
        // Axios automatically sends cookies if you configure it globally,
        // or you can add `withCredentials: true` to this specific request.
        // This request will succeed (200 OK) if the cookie is valid.
        await axios.get('/api/verify', { withCredentials: true });
        setIsAuthenticated(true);

      } catch (error) {
        // This will catch the 401 Unauthorized error if the cookie is missing or invalid.
        console.log("Verification failed, user is not logged in.");
        setIsAuthenticated(false);
      } finally {
        // No matter what, stop the loading spinner
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []); // The empty array [] means this effect runs ONLY ONCE when the app first loads.

  return (
    <>
      <Router>
        <Navbar signInButton={signInButton} setCookie={setIsAuthenticated} />
        <Routes>
          <Route path='/' element={<Home setSignInButton={setSignInButton} />} />
          <Route path='/loader' element={<Loader />} />
          <Route path='/aboutus' element={<AboutUs setSignInButton={setSignInButton} />} />
          <Route path='/toll' element={<TollLogin setCookie={setIsAuthenticated} selectedToll={selectedToll} setSelectedToll={setSelectedToll} setSignInButton={setSignInButton} />} />
          {/* {!isAuthenticated &&
            (<>
              <Route path='/toll/start' element={<NoAccess />} />
              <Route path='/toll/upload' element={<NoAccess />} />
              <Route path='/toll/checkrecords' element={<NoAccess />} />
            </>
            )
          }

          {isAuthenticated &&
            (<>
              <Route path='/toll/start' element={<TollStart selectedToll={selectedToll} setSignInButton={setSignInButton} />} />
              <Route path='/toll/upload' element={<TollUpload selectedToll={selectedToll} setSignInButton={setSignInButton} />} />
              <Route path='/toll/checkrecords' element={<CheckRecords selectedToll={selectedToll} setSignInButton={setSignInButton} />} />
            </>
            )
          } */}
          {/* Conditional Routes based on the CORRECT state */}
          <Route path='/toll/start' element={isAuthenticated ? <TollStart selectedToll={selectedToll} setSignInButton={setSignInButton} /> : <NoAccess />} />
          <Route path='/toll/upload' element={isAuthenticated ? <TollUpload selectedToll={selectedToll} setSignInButton={setSignInButton} /> : <NoAccess />} />
          <Route path='/toll/checkrecords' element={isAuthenticated ? <CheckRecords selectedToll={selectedToll} setSignInButton={setSignInButton} /> : <NoAccess />} />

          <Route path='/stats' element={<Statistics setSignInButton={setSignInButton} />} />
          <Route path='/guest' element={<Guest setSignInButton={setSignInButton} />} />
          <Route path='/guest/upload' element={<GuestUpload setSignInButton={setSignInButton} />} />
          <Route path='/guest/checkdetails' element={<GuestDetails setSignInButton={setSignInButton} />} />
          <Route path='*' element={<NotFound setSignInButton={setSignInButton} />} />
        </Routes>
        <Footer setSignInButton={setSignInButton} />
      </Router>
    </>
  );
}

export default App;