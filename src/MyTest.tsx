import React from 'react'

export interface MyTestProps {
  name?: string;
}

const MyTest: React.FC<MyTestProps> = (props) => {
  return (
    <div>This is MyTest {props?.name}</div>
  )
}

export default MyTest