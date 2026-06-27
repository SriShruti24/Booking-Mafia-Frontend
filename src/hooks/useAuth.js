import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  selectAuthUser,
  selectAuthToken,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../features/auth/authSelectors';
import {
  loginThunk,
  registerThunk,
  fetchProfileThunk,
  logoutThunk,
} from '../features/auth/authThunk';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(selectAuthUser);
  const token = useSelector(selectAuthToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = useCallback((credentials) => dispatch(loginThunk(credentials)), [dispatch]);
  const register = useCallback((data) => dispatch(registerThunk(data)), [dispatch]);
  const fetchProfile = useCallback(() => dispatch(fetchProfileThunk()), [dispatch]);
  const logout = useCallback(() => dispatch(logoutThunk()), [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    fetchProfile,
    logout,
  };
};
