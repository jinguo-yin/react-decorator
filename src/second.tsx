import { Controller, MethodDec, PropertyDec } from './decorator/decorator'

@Controller('SecondController')
class Second {
    //标准函数使用方法装饰器
    @MethodDec('second')
    TestPage() {
        return(
            <div>this is second Page</div>
        )
    }

    //箭头函数使用属性装饰器
    @PropertyDec('ArrowFunction')
    arrowFunctionPage = (name: string, age: number) => {
        return(
            <div>this is arrow function, must use Property Decorator {name} age: {age}</div>
        )
    }
}

export default Second

