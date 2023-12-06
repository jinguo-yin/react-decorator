import React from 'react'
import { Controller, MethodDec } from './decorator/decorator'

@Controller('SecondController')
class Second {
    @MethodDec('second')
    TestPage() {
        return(
            <div>this is second Page</div>
        )
    }
}

export default Second