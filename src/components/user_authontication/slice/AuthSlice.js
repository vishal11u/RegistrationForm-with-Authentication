import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AuthService = () => {
    // const apiUrl = 'http://192.168.0.230:8050/api/login';
    const apiUrl = 'https://dummyjson.com/auth/login';
    return apiUrl;
};

const getStoredUser = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
};

const storedUser = getStoredUser();
const initialState = {
    isLoggedIn: storedUser?.statusCode === 200,
    user: storedUser,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk('user/loginUser', async ({ username, password }, { rejectWithValue }) => {
    try {
        const response = await axios.post(AuthService(), { username, password });
        // console.log('Response Data:', response.data);
        if (response.data.statusCode === 200) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: "Unknown error occurred" });
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            state.isLoggedIn = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.statusCode === 200) {
                    state.isLoggedIn = true;
                    state.user = action.payload;
                    localStorage.setItem('user', JSON.stringify(action.payload));
                } else {
                    state.isLoggedIn = false;
                    state.error = action.payload.message || "Login failed";
                }
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Unknown error';
                console.error('Login failed:', state.error);
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;