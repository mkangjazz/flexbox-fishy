import './codeinput.css';

import React from 'react';
import {useState, useEffect} from 'react';

const CodeInput = ({
    saveInput, debounce
    }) => {

    const [inputFields, setInputFields] = useState({});



    useEffect(() => {
        console.log(inputFields);
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(e.target.value.length<5 && e.target.name==='left'){
            return;
        }else{
            updateDisplay(name, value);
            }
    }

    const updateDisplay = debounce((name, value)=>
        {
            setInputFields({...inputFields, [name]: value})
        }, 500);

    return (
        <form autoComplete="off" id='codeinput' className='codeinput'>
          <table className='code-interface'>
              <caption>Use CSS to help these fish find their missing scales</caption>
              <tbody>
                  <tr>
                      <th>1</th>
                      <td><code className='selector'>{`.fishies {`}</code></td>
                  </tr>
                  <tr>
                      <th>2</th>
                      <td className='indent-left'>
                          <input autoComplete="off" name='left' type='text' onChange={handleInputChange}/>
                          {` : `}
                          <input autoComplete="off" name='right' type='text' onChange={handleInputChange}/>
                          {` ; `}
                      </td>
                  </tr>
                  <tr>
                      <th>3</th>
                      <td><code>{`}`}</code></td>
                  </tr>
              </tbody>
          </table>
        </form>
    )
}

export default CodeInput;
