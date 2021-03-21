import React from 'react';

export default function CSSObjects(props) {
  const lineCount = (() => {
    let num = 1;

    function run() {
      return num++;
    }

    return {
      run: run
    }
  })();

  const styleInputs = (obj) => {
    const jsx = [];

    for (var key in obj.styles) {
      jsx.push(
        <tr
          className='selector-styles'
          key={`style-${key}`}
        >
          <td className='code-line-number'>
            {lineCount.run()}
          </td>
          <td className='code-indent'>
            {key === 'display'
              ? <input
                  data-selector={obj.selector}
                  disabled={true}
                  type='text'
                  value='display'
                />
              : <input
                  data-selector={obj.selector}
                  type='text'
                />
            }
          </td>
          <td className='code-separator'>
            :
          </td>
          <td>
            {key === 'display'
              ? <input
                  data-selector={obj.selector}
                  disabled={true}
                  type='text'
                  value='flex'
                />
              : <input
                  data-selector={obj.selector}
                  type='text'
                />
            }
          </td>
          <td className='code-separator'>
            ;
          </td>
        </tr>
      );
    }

    return jsx;
  };

  return (
    props.currentLevelData.cssObjects.map(obj=> {
      return (
        <React.Fragment key={obj.selector}>
          <tr
            className='selector-open'
            key={obj.selector}
          >
            <td className='code-line-number'>{lineCount.run()}</td>
            <td colSpan='4'>{obj.selector} {`{`}</td>
          </tr>
          {styleInputs(obj)}
          <tr className='selector-close'>
            <td className='code-line-number'>{lineCount.run()}</td>
            <td colSpan='4'>{`}`}</td>
          </tr>
        </React.Fragment>
      );
    })
  );
};