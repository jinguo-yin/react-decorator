import React from 'react'
import { Controller, MethodDec, PropertyDec } from './decorator/decorator'
import MyTest, { MyTestProps } from './MyTest'
import Dashboard from './Dashboard'

@Controller('homeController')
export class Home {
    
    @MethodDec('test')
    Test(action?: string){
        return (
            <MyTest name = 'guanzhilin' action= {action} />
        )
    }

    @PropertyDec('myTest')
    myTest: React.FC<MyTestProps> = MyTest;

    @PropertyDec('dashboard')
    dashboard: React.FC<{}> = Dashboard;
}

export default Home;