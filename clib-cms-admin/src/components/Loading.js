import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div style={{ textAlign: 'center', marginTop: 40, marginBottom: 40 }}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
