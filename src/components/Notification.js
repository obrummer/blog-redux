import React from 'react';
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notificationReducer)

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

//   return (
//     <div>
//       <div className={error ? 'error' : 'success'}>{message}</div>
//     </div>
//   );
// };

export default Notification;

