import React from 'react'

//使用HOC向函数式组件添加Reflect

export const enhancedComponent = 
    <T extends JSX.IntrinsicAttributes>(WrappedComponent: React.FC<T>)
    : React.FC<T> => {
        console.log('WrappedComponent', WrappedComponent.name, WrappedComponent.length);

        Reflect.defineMetadata('functionComponent', WrappedComponent.name, WrappedComponent);

        return function(props: T) {
            return <WrappedComponent {...props} />
        }
}

const Dashboard: React.FC<{}> = enhancedComponent(() => {
  return (
    <div>
      <div>Test WebAssembly</div>
    </div>
  )
})

export default Dashboard