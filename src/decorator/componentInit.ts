import { ReactNode } from "react";
import { CLASS_HANDLE, METHOD_HANDLE, PROPERTY_HANDLE } from "./decorator";

type Construct<T = any> = new (...args: Array<any>) => T;

export type ControllerClass = Construct;

export interface Options {
    controllers: ControllerClass[];
}

export enum CompType  {'function', 'property'};

export interface ICompDesc {
    decorator: string;
    type: CompType;
    funcName: string;
    entity: ReactNode;
}

export const baseController: {scope: string, controller: any}[] = [];
export const compMap: ICompDesc[] = [];

export async function componentInit({controllers}: Options) {
    for(const controllerClass of controllers) {         //封装组件的Class，由于箭头函数不支持类装饰器，所以使用Class封装

        const controller = new controllerClass();
        const controllerName = Reflect.getMetadata(CLASS_HANDLE, controllerClass);

        const proto = controllerClass.prototype;

        const props =  Object.getOwnPropertyNames(controller);      //property

        props.forEach(propName => {
            if(Reflect.getMetadata(PROPERTY_HANDLE, proto, propName)) {
                const decoratorContent = Reflect.getMetadata(PROPERTY_HANDLE, proto, propName);
                compMap.push({decorator: decoratorContent, type: CompType.property, funcName: propName, entity: controller[propName]});
            }
        })
      
        const funcs = Object.getOwnPropertyNames(proto).filter(     //function use Inject
            item => typeof controller[item] === 'function' && item !== 'constructor'
        );

        funcs.forEach(funcName => {
            if(Reflect.getMetadata(METHOD_HANDLE, proto, funcName)){
                const decoratorContent = Reflect.getMetadata(METHOD_HANDLE, proto, funcName);
                compMap.push({decorator: decoratorContent, type: CompType.function, funcName: funcName, entity: controller[funcName]});
            }
        })
    
        baseController.push({scope: controllerName, controller: controller})
    }
}
