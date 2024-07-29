
import React, { useContext } from 'react';
import AlertContext from "../context/alert/AlertContext";

function Alert() {
  const { alert } = useContext(AlertContext);

  const capitalize = (word) => {
    
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: '50px' }}>
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
