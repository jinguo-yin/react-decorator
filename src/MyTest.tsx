import React from 'react'

export interface MyTestProps {
  name?: string;
  action?: string;
}

const MyTest: React.FC<MyTestProps> = (props) => {

  const display = () => {
    alert('this is from json');
  }
  const handleClick = () => {
    console.log('props.onClick', props.action);
    if(props.action) {
      eval(props.action);      
    }
  }
  
  return (
    <div>This is MyTest {props?.name}
      <button onClick={handleClick}>Click</button>
    </div>
  )
}

export default MyTest