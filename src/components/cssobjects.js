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

  // let's just build a string
  const styleInputs = (obj) => {
    const jsx = [];

    for (var key in obj.styles) {
      jsx.push(
        <tr key={`style-${key}`}>
          <td>
            {lineCount.run()}
          </td>
          <td>
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
        </tr>
      );
    }

    return jsx;
  };

  return (
    props.currentLevelData.cssObjects.map(obj=> {
      return (
        <React.Fragment key={obj.selector}>
          <tr key={obj.selector}>
            <td>{lineCount.run()}</td>
            <td>{obj.selector}</td>
            <td>{`{`}</td>
          </tr>
          {styleInputs(obj)}
          <tr>
            <td>{lineCount.run()}</td>
            <td rowSpan='3'>{`}`}</td>
          </tr>
        </React.Fragment>
      );
    })
  );
};