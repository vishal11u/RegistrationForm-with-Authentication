import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Main_Registration from '../registration/Main_Registration';
import Dashboard from './Dashboard';

function Layout() {
    return (
        <div className='w-full h-[100vh] p-4'>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/registration' element={<Main_Registration />} />
            </Routes>
        </div>
    )
}

export default Layout;