// @flow

/* global module */

/* eslint-disable complexity */

/* eslint consistent-this: ["error", "model"] */

import {isNotFunction, isNotString, isNumber, isString} from './is';

// type AttrType = {
// [key: string]: AttrTypeT
// };

type ActionType<ValueType> = (newValue: ValueType | void, oldValue: ValueType | void) => mixed;

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

type ListeningType<Model, KeyName, Action, ContextType> = Array<ListeningItemType<Model, KeyName, Action, ContextType>>;

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
        return this.setKeyValue(key, value);
        // return isString(key) ? this.setKeyValue(key, value) : this.setObject(key);
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
    // eslint-disable-next-line sonarjs/cognitive-complexity, max-statements
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

        const filtered: Array<ListenersItemType<ValueType>> = [];

        const listenerDataLength = listenersByKey.length;
        let listenerDataIndex = 0;

        if (argsLength === 2) {
            // eslint-disable-next-line no-loops/no-loops
            for (; listenerDataIndex < listenerDataLength; listenerDataIndex += 1) {
                const listenerData: ListenersItemType<ValueType> = listenersByKey[listenerDataIndex];

                if (listenerData[0] !== action) {
                    filtered.push(listenerData);
                }
            }

            allListeners[key] = filtered;
            return model;
        }

        if (argsLength === 3) {
            // eslint-disable-next-line no-loops/no-loops
            for (; listenerDataIndex < listenerDataLength; listenerDataIndex += 1) {
                const listenerData: ListenersItemType<ValueType> = listenersByKey[listenerDataIndex];

                if (listenerData[0] !== action || listenerData[1] !== context) {
                    filtered.push(listenerData);
                }
            }

            allListeners[key] = filtered;
            return model;
        }

        return model;
    }

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
    trigger(key: KeyNameType, newValue: ValueType | void, oldValue: ValueType | void): this {
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

        const listenerDataLength = listeners.length;
        let listenerDataIndex = 0;

        // eslint-disable-next-line no-loops/no-loops
        for (; listenerDataIndex < listenerDataLength; listenerDataIndex += 1) {
            const listenerData: ListenersItemType<ValueType> = listeners[listenerDataIndex];

            Reflect.apply(listenerData[0], listenerData[1], [newValueArg, oldValueArg]);
        }

        return model;
    }

    /**
     *
     * @return {object} all attributes
     */

    getAllAttributes(): AttrType<KeyNameType, ValueType> {
        return this.attr;
    }

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

        if (oldValue !== newValue) {
            model.trigger(key, newValue, oldValue);
        }
        return model;
    }

    /*
    setObject(obj: {|+[key: KeyNameType]: ValueType|}): this {
        const model = this;

        Object.keys(obj).forEach((key: KeyNameType) => {
            model.setKeyValue(key, obj[key]);
        });

        return model;
    }
*/
}
