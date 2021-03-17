import React from 'react';

export default function Description(props) {
  return (
    <div
      className='description'
      dangerouslySetInnerHTML={{__html: props.content }}
    >
    </div>
  );
}
