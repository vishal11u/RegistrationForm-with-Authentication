import React from 'react';
import User_Login_Page from './components/user_authontication/User_Login_Page';
// import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Main_Layout from './components/dashboard/Main_Layout';

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className='h-full w-full overflow-hidden bg-gray-100'>
      {/* <Routes>
        <Route path='/login' element={<User_Login_Page />} />
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      </Routes> */}
      {isLoggedIn ? (
        <Main_Layout />
      ) : (
        <User_Login_Page />
      )}
    </div>
  );
}

export default App;