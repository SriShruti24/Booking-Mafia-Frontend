import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { fetchProfileThunk } from './features/auth/authThunk';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Attempt to restore user profile details on boot if token is present
    dispatch(fetchProfileThunk());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
