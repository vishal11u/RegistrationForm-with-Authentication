import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../user_authontication/slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function User_Login_Page() {
    const schema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

    const onSubmit = (data) => {
        dispatch(loginUser(data))
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Login Error:', error);
                navigate('/login');
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className='h-[82.5vh] w-full'>
            <div className='border max-w-md mt-32 pb-2 pt-12 bg-white mx-auto rounded-xl shadow-md'>
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl tracking-tight">
                        Login
                    </h2>
                </div>
                <div className="flex justify-center pt-2 mx-4 md:mx-0">
                    <form className="w-full max-w-lg bg-white px-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-full px-3 mb-6 mt-5">
                                <TextField
                                    size='small'
                                    id="username"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    {...register("username")}
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />
                            </div>
                            <div className="w-full md:w-full px-3 mb-6">
                                <TextField
                                    size='small'
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    {...register("password")}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </div>
                            <div className="w-full md:w-full px-3">
                                <button type="submit" className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500">
                                    {loading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
                                </button>
                            </div>
                            <div className='text-center pt-2 font-medium text-red-500 text-[15px] w-full'>
                                {error && typeof error === 'object' ? error.message : error}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default User_Login_Page;