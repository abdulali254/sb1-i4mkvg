import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import ContentPlanning from './pages/ContentPlanning';
import { signInWithClerk } from './firebase';

function App() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const signInToFirebase = async () => {
      if (isLoaded && isSignedIn) {
        const token = await getToken({ template: 'integration_firebase' });
        await signInWithClerk(token);
      }
    };

    signInToFirebase();
  }, [isLoaded, isSignedIn, getToken]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/content-planning" element={<ContentPlanning />} />
      </Routes>
    </div>
  );
}

export default App;