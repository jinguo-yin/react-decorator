import { ReactNode } from "react";
import { CLASS_HANDLE, METHOD_HANDLE, PROPERTY_HANDLE } from "./decorator";

type Construct<T = any> = new (...args: Array<any>) => T;

export type ControllerClass = Construct;

export interface Options {
    controllers: ControllerClass[];
}

export enum CompType  {'function', 'property'};

export interface ICompDesc {
    name: string;
    type: CompType;
    entity: ReactNode;
}
export let baseController: {scope: string, conroller: any}[] = [];
export const compMap: ICompDesc[] = [];

export async function createBase({controllers}: Options) {
    for(const controllerClass of controllers) {
        const controller = new controllerClass();

        const controllerName = Reflect.getMetadata(CLASS_HANDLE, controllerClass);

        const proto = controllerClass.prototype;

        const props =  Object.getOwnPropertyNames(controller);      //property

        props.forEach(propName => {
            if(Reflect.getMetadata(PROPERTY_HANDLE, proto, propName)) {
                const decoratorContent = Reflect.getMetadata(PROPERTY_HANDLE, proto, propName);
                compMap.push({name: decoratorContent, type: CompType.property, entity: controller[propName]});
            }
        })
      
        const funcs = Object.getOwnPropertyNames(proto).filter(     //function use Inject
            item => typeof controller[item] === 'function' && item !== 'constructor'
        );

        funcs.forEach(funcName => {
            if(Reflect.getMetadata(METHOD_HANDLE, proto, funcName)){
                const decoratorContent = Reflect.getMetadata(METHOD_HANDLE, proto, funcName);
                compMap.push({name: decoratorContent, type: CompType.function, entity: controller[funcName]});
            }
        })
        
        baseController.push({scope: controllerName, conroller: controller})
    }
}