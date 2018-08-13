// @flow

/* global module */

/* eslint-disable complexity */

/* eslint consistent-this: ["error", "model"] */

import {isNotFunction, isNotString, isNumber, isString} from './is';

// type AttrType = {
// [key: string]: AttrTypeT
// };

type ActionType<ValueType> = (newValue: ValueType, oldValue: ValueType) => mixed;

type ListenersItemType<ValueType> = [ActionType<ValueType>, {}];

type ListenersType<KeyNameType, ValueType> = {
    [key: KeyNameType]: Array<ListenersItemType<ValueType>>
};

type ListeningItemType<MainModelType, KeyNameType, ActionInListenType, ContextType> = [
    MainModelType,
    KeyNameType,
    ActionInListenType,
    ContextType
];

type ListeningType<MainModelType, KeyNameType, ActionInListenType, ContextType> = Array<ListeningItemType<MainModelType, KeyNameType, ActionInListenType, ContextType>>;

type AttrType<KeyNameType, ValueType> = {[key: KeyNameType]: ValueType};

/**
 *
 * @param {object} attributes of new MainModel instance
 * @return {MainModel} instance
 */
export default class MainModel<KeyNameType: string, ValueType> {
    attr: AttrType<KeyNameType, ValueType>;
    listeners: ListenersType<KeyNameType, ValueType>;
    // listening: ListeningType<MainModel, KeyNameType, ActionType<ValueType>, {}>;

    constructor() {
        const model = this;

        model.attr = {};
        model.listeners = {};
        // model.listening = [];
    }

    /**
     * @return {void}
     */
    destroy() {
        const model = this;

        model.attr = {};
        // model.offChange();
        // model.stopListening();
    }

    /**
     *
     * @param {string} key of value
     * @param {*} [value] saved value
     * @return {MainModel} instance
     */
    set(key: KeyNameType, value: ValueType): this {
        // return isString(key) ? this.setKeyValue(key, value) : this.setObject(key);
        return this.setKeyValue(key, value);
    }

    /**
     *
     * @param {string} key of value
     * @return {*} saved value
     */
    get(key: KeyNameType): ValueType | void {
        const {attr} = this;

        return attr[key];
    }

    /**
     *
     * @param {string} key of value
     * @param {function} action to execute
     * @param {*} [context] of action
     * @return {MainModel} instance
     */
    onChange(key: KeyNameType, action: ActionType<ValueType>, context?: {} = this): this {
        const model = this;
        const listeners = model.getListenersByKey(key);

        listeners.push([action, context]);

        return model;
    }

    /**
     *
     * @param {string} [key] of value
     * @param {function} [action] was execute
     * @param {*} [context] of action
     * @return {MainModel} instance
     */
    /*
    offChange(key?: KeyNameType, action?: ActionType<ValueType>, context?: {}): this {
        const model = this;

        const argsLength = arguments.length;

        // key did not passed
        if (isNotString(key)) {
            model.listeners = {};
            return model;
        }

        const allListeners = model.getAllListeners();

        // action did not passed
        if (argsLength === 1) {
            allListeners[key] = [];
            return model;
        }

        if (isNotFunction(action)) {
            return model;
        }

        const listenersByKey = model.getListenersByKey(key);
        // context did not passed

        if (argsLength === 2) {
            allListeners[key] = listenersByKey.filter(
                (listener: ListenersItemType<ValueType>): boolean => listener[0] !== action
            );
            return model;
        }

        if (argsLength === 3) {
            allListeners[key] = listenersByKey.filter(
                (listener: ListenersItemType<ValueType>): boolean => listener[0] !== action || listener[1] !== context
            );
        }

        return model;
    }
*/

    /**
     *
     * @param {MainModel} mainModel - other model to start listen
     * @param {string} key of value
     * @param {function} action was execute
     * @param {*} [context] of action
     * @returns {MainModel} instance
     */
    /*
    listenTo(mainModel: MainModel, key: KeyNameType, action: ActionType<ValueType>, context?: {} = this): this {
        const model = this;
        const listening = model.getListening();

        listening.push([mainModel, key, action, context]);
        mainModel.onChange(key, action, context);

        return model;
    }
*/

    /**
     * @param {MainModel} [mainModel] - other model to stop listen
     * @param {string} [key] of value
     * @param {function} [action] was execute
     * @param {*} [context] of action
     * @return {MainModel} instance
     */
    // stopListening(mainModel?: MainModel, key?: KeyNameType, action?: ActionType<ValueType>, context?: {}): this {
    //     const model = this;
    //     const argsLength = arguments.length;
    //     const listening = model.getListening();
    //
    //     if (argsLength === 0) {
    //         listening.forEach(
    //             ([listMainModel, listKey, listAction, listContext]: ListeningItemType): MainModel =>
    //                 model.stopListening(listMainModel, listKey, listAction, listContext)
    //         );
    //         return model;
    //     }
    //
    //     if (argsLength === 1) {
    //         listening.forEach(
    //             ([listMainModel, listKey, listAction, listContext]: ListeningItemType): MainModel | boolean =>
    //                 listMainModel === mainModel && model.stopListening(listMainModel, listKey, listAction, listContext)
    //         );
    //         return model;
    //     }
    //
    //     if (argsLength === 2) {
    //         listening.forEach(
    //             ([listMainModel, listKey, listAction, listContext]: ListeningItemType): MainModel | boolean =>
    //                 listMainModel === mainModel &&
    //                 listKey === key &&
    //                 model.stopListening(listMainModel, listKey, listAction, listContext)
    //         );
    //         return model;
    //     }
    //
    //     if (argsLength === 3) {
    //         listening.forEach(
    //             ([listMainModel, listKey, listAction, listContext]: ListeningItemType): MainModel | boolean =>
    //                 listMainModel === mainModel &&
    //                 listKey === key &&
    //                 listAction === action &&
    //                 model.stopListening(listMainModel, listKey, listAction, listContext)
    //         );
    //         return model;
    //     }
    //
    //     model.listening = listening.filter(
    //         ([listMainModel, listKey, listAction, listContext]: ListeningItemType): boolean => {
    //             if (
    //                 mainModel &&
    //                 listMainModel === mainModel &&
    //                 listKey === key &&
    //                 listAction === action &&
    //                 listContext === context
    //             ) {
    //                 mainModel.offChange(listKey, listAction, listContext);
    //                 return false;
    //             }
    //             return true;
    //         }
    //     );
    //
    //     return model;
    // }

    /**
     *
     * @param {string} key of value
     * @param {*} [newValue] of instance
     * @param {*} [oldValue] of instance
     * @return {MainModel} instance
     */
    trigger(key: KeyNameType, newValue: ValueType, oldValue: ValueType): this {
        const model = this;
        const listeners = model.getListenersByKey(key);
        const argsLength = arguments.length;

        let oldValueArg = null;
        let newValueArg = null;

        if (argsLength === 1) {
            oldValueArg = model.get(key);
            newValueArg = oldValueArg;
        }

        if (argsLength === 2) {
            oldValueArg = model.get(key);
            newValueArg = newValue;
        }

        if (argsLength === 3) {
            oldValueArg = oldValue;
            newValueArg = newValue;
        }

        for (let ii = 0; ii < listeners.length; ii += 1) {
            const listenerData: ListenersItemType<ValueType> = listeners[ii];

            Reflect.apply(listenerData[0], listenerData[1], [newValueArg, oldValueArg]);
        }

        // listeners.forEach((listenerData: [ActionType<ValueType>, {}]) => {
        //     Reflect.apply(listenerData[0], listenerData[1], [newValueArg, oldValueArg]);
        // });
        // listeners.forEach(listenerData => listenerData[0].call(listenerData[1], newValueArg, oldValueArg));

        return model;
    }

    /**
     *
     * @return {object} all attributes
     */
    /*
    getAllAttributes(): AttrType<KeyNameType, ValueType> {
        return this.attr;
    }
*/

    /**
     *
     * @return {object} all listeners
     */
    getAllListeners(): ListenersType<KeyNameType, ValueType> {
        return this.listeners;
    }

    /**
     *
     * @return {*[]} all listening
     */
    // getListening(): ListeningType<MainModel, KeyNameType, ActionType<ValueType>, {}> {
    //     return this.listening;
    // }

    getListenersByKey(key: KeyNameType): Array<ListenersItemType<ValueType>> {
        const model = this;
        const listeners = model.listeners;

        if (listeners.hasOwnProperty(key)) {
            return listeners[key];
        }

        listeners[key] = [];

        return listeners[key];
    }

    // helpers
    setKeyValue(key: KeyNameType, newValue: ValueType): this {
        const model = this;
        const attr = model.attr;
        const oldValue = model.get(key);

        attr[key] = newValue;

        if (typeof oldValue !== 'undefined') {
            if (oldValue !== newValue) {
                model.trigger(key, newValue, oldValue);
            }
            return model;
        }

        if (typeof oldValue === 'undefined') {
            model.trigger(key, newValue, newValue);
            return model;
        }

        return model;
    }

    /*
    setObject(obj: {}): MainModel {
        const model = this;

        Object.keys(obj).forEach((key: string): MainModel => model.setKeyValue(key, obj[key]));

        return model;
    }
    */
}
