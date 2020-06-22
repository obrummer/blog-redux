import React from 'react';

const Notification = ({ message }) => {
  if (message === '') {
    return null;
  }

  return (
    <div>
      <div>{message}</div>
    </div>
  );
};

export default Notification;