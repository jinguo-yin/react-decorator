/* eslint-disable no-new-func */
import React from 'react'
import * as acorn from 'acorn';

export interface MyTestProps {
  name?: string;
  action?: string;
}

const MyTest: React.FC<MyTestProps> = (props) => {
  const display = (p: string) => {
    alert(`this is from json ${p}`);
  }
  const handleClick = () => {
    const hello = () => {
      console.log('hello from MyTest');
    }

    const str =  `
      const {hello, display} = arguments[0]; 
      const {hello: envHello, dispay: envDisplay} = env;
      console.log("env is: ", env);
      hello(); 
      return 1;
    `;

    let script = null; 
    try{
      script = acorn.parse(str,  {ecmaVersion: 'latest', allowReturnOutsideFunction: true});
    }catch (err: any) {
      console.log('err: ', err);
    }

    console.log('script: ', script);

    const func = new Function('env',str);
    const result = func({hello: hello, display: display});
    console.log('result: ', result);
  }
  
  return (
    <div>This is MyTest {props?.name}
      <button onClick={handleClick}>TestString</button>
      <div dangerouslySetInnerHTML={{__html: '<div>This is from dangerouslySetInnerHTML</div>'}} />
      <input type = 'text'></input>
    </div>
  )
}

export default MyTest