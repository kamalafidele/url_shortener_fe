
import React from 'react';
import { Navigate } from 'react-router-dom';

import authStorage from '../auth/storage';

function ProtectedRoute({ children }) {
    return authStorage.getToken() ? children : <Navigate to='/login'/>
}

export default ProtectedRoute;