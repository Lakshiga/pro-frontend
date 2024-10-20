import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="secondary" onClick={() => navigate(-1)} style={{ margin: '10px' }}>
        Back
      </Button>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
