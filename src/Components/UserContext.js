import React, { useState,useEffect } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('/api/user');
        setUserId(response.data._id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserId();
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;