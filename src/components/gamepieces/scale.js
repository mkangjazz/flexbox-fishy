import './scale.css';

import React from 'react';

export default function Scale(props) {
  return (
    <div className="scale">
      <div className="scale-quarter upper-left">
        <div className="circle">
        </div>
      </div>
      <div className="scale-quarter upper-right">
        <div className="circle">
        </div>
      </div>
      <div className="scale-quarter lower-right">
        <div className="triangle">
        </div>
      </div>
      <div className="scale-quarter lower-left">
        <div className="triangle">
        </div>
      </div>
    </div>
  );
}
