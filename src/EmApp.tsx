import React, { useEffect, useState } from 'react'
import createModule from './em/src/add.mjs';



const EmApp = () => {
    const [add, setAdd] = useState<any>();

    useEffect(() => {
        createModule().then((Module: any) => {
        setAdd(() => Module.cwrap("add", "number", ["number", "number"]));
        });
    }, []);
    
    if(!add) {
        console.log("Loading webassembly...");
    }
    
    const testWasm =() => {
        const result = add(123, 222);
        console.log('result is: ', result);


    }
    return (
        <div>
        <div>Test WebAssembly</div>
        <button onClick = {testWasm}>TestWasm</button>
        </div>
    )
}

export default EmApp