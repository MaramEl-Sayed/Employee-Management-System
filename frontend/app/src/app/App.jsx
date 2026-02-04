import React from 'react';
import { AuthProvider } from '../auth/AuthProvider';
import Router from './router';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
