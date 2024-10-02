import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";

const Character = (props) => {

    return (
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <li className="nav-item">
                  <Link className="nav-link" to={`/character/${props.data.id}`}>
                    {props.data.name}
                  </Link>
                </li>
        </div>
    );
};

export default Character;