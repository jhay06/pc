import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function CustomersLoading() {
  return (
    <div>
      <Spinner animation="border" role="status" size="sm">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default CustomersLoading;
