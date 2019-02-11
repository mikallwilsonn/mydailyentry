import React from 'react';


export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className={input.name}>
      <label htmlFor={input.name}>{label}</label>
      <input {...input} id={input.name} style={{ marginBottom: '5px' }} />
      <div className="errorMessage red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
