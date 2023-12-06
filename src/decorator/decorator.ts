import 'reflect-metadata';

export const PARAMTYPES_METADATA = 'design:paramtypes';
export const INJECTABLE = 'injectable';
export const INJECT_NAME = 'inject:name';
export const INJECT_TYPE = {
    CLASS: 'class',
    CUSTOM: 'custom',
    WINDOW: 'window'
};

export const METHOD_HANDLE = "method:handle";
export const PROPERTY_HANDLE = 'property:handle';
export const CLASS_HANDLE = 'class:handle';

export function Controller(controllerName: string): ClassDecorator {
    return (_) => {
        console.log('_', _, controllerName);
        Reflect.defineMetadata(CLASS_HANDLE, controllerName, _);
    }
}


export function MethodDec(componentName: string): MethodDecorator {        //函数组件装饰器
    return (target, propertyName) => {
        Reflect.defineMetadata(METHOD_HANDLE, componentName, target, propertyName);
    }
}

export function PropertyDec(propertyName: string): PropertyDecorator {
    if(!propertyName) {
        throw new Error('inject name is required');
    }

    return (target, index) => {
        Reflect.defineMetadata(PROPERTY_HANDLE, propertyName, target, index);
    }
}

