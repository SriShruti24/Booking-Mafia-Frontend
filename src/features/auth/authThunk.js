import { authApi } from '../../api/authApi';
import { authStart, authSuccess, authFailure, logout as logoutAction, setUser } from './authSlice';

export const loginThunk = (credentials) => async (dispatch) => {
  dispatch(authStart());
  try {
    const response = await authApi.signin(credentials);
    const token = typeof response === 'string' ? response : response.data || response.token;
    localStorage.setItem('token', token);
    
    const profile = await authApi.getMe();
    dispatch(authSuccess({ user: profile.data, token }));
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};

export const registerThunk = (data) => async (dispatch) => {
  dispatch(authStart());
  try {
    await authApi.signup(data);
    const response = await authApi.signin({ email: data.email, password: data.password });
    const token = typeof response === 'string' ? response : response.data || response.token;
    localStorage.setItem('token', token);
    
    const profile = await authApi.getMe();
    dispatch(authSuccess({ user: profile.data, token }));
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};

export const fetchProfileThunk = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) return;
  
  dispatch(authStart());
  try {
    const profile = await authApi.getMe();
    dispatch(setUser(profile.data));
  } catch (error) {
    dispatch(authFailure(error.message));
    dispatch(logoutAction());
  }
};

export const logoutThunk = () => (dispatch) => {
  dispatch(logoutAction());
};
