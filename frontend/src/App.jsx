import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import SignUpPage from './pages/auth/signup/signUpPage';
import LoginPage from './pages/auth/login/LoginPage';
import HomePage from './pages/home/HomePage';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import Posts from './components/common/Posts';

function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-black'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='flex max-w-7xl mx-auto'>
        <Sidebar />
        <main className='flex-1'>
          <Routes>
            <Route path='/' element={<Posts />} />
            {/* Add more routes here */}
          </Routes>
        </main>
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
