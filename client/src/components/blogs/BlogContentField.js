import React from 'react';
import ContentContext from '../../contexts/ContentContext';

export default ({ input, label, meta: { error, touched } }) => {

    return (
        <ContentContext.Consumer>
            {(value) => { 

                return (
                    <div className={input.name}>
                        <label htmlFor={input.name}>{label}</label>
                        <input {...input} id={input.name} value={value} style={{ marginBottom: '5px' }} />
                        <div className="errorMessage red-text" style={{ marginBottom: '20px' }}>
                            {touched && error}
                        </div>
                    </div>
                );
            }}
        </ContentContext.Consumer>
    );

};
