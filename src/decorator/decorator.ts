import 'reflect-metadata';

export const METHOD_HANDLE = "method:handle";
export const PROPERTY_HANDLE = 'property:handle';
export const CLASS_HANDLE = 'class:handle';

export function Controller(controllerName: string): ClassDecorator {    //Class Decorator
    return (_) => {
        Reflect.defineMetadata(CLASS_HANDLE, controllerName, _);
    }
}

export function MethodDec(componentName: string): MethodDecorator {        //Functional Component Decorator
    return (target, propertyName) => {
        Reflect.defineMetadata(METHOD_HANDLE, componentName, target, propertyName);
    }
}

export function PropertyDec(propertyName: string): PropertyDecorator {  //Property Decorator
    if(!propertyName) {
        throw new Error('inject name is required');
    }

    return (target, index) => {
        Reflect.defineMetadata(PROPERTY_HANDLE, propertyName, target, index);
    }
}

