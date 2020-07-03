import { Pin, PinSelectable } from "micro-device-modules"

export const PUT_PIN = 'PUT_PIN';
export const REMOVE_SELECTED_PINS = 'REMOVE_SELECTED_PINS';
export const TOGGLE_PIN = 'TOGGLE_PIN';
export const SELECTED_PIN = 'SELECTED_PIN';
export const NEW_PIN = 'NEW_PIN';
export const REPLACE_PINS = 'REPLACE_PINS';

export interface pinState {
    list: Pin[];
    item: Pin;
}

export const defaultPin: Pin = {
    id: 0,
    label: "Pin #",
    digital: true,
    purpose: "",
}
interface newAction {
    type: 'NEW_PIN';
    pins: PinSelectable;
}
const newPin = (action: newAction, state: pinState) => {
    state.item = defaultPin;
    return state;
}

interface getAction {
    type: 'SELECTED_PIN';
    pins: PinSelectable;
}
const getPin = (action: getAction, state: pinState) => {
    const l = action.pins.getSelected();
    state.item = (l.length > 0) ? l[0] : defaultPin;
    return state;
}

interface putAction {
    type: 'PUT_PIN';
    pins: PinSelectable;
    pin: Pin;
};
const putPin = (action: putAction, state: pinState) => {
    action.pins.put(action.pin);
    state.list = action.pins.sort();
    return state;
}

interface removeAction {
    type: 'REMOVE_SELECTED_PINS';
    pins: PinSelectable;
}
const removeSelectedPins = (action: removeAction, state: pinState) => {
    action.pins.removeSelected();
    state.list = action.pins.sort();
    return state;
}

interface replaceAction {
    type: 'REPLACE_PINS';
    pins: PinSelectable;
    list: Pin[];
}
const replacePins = (action: replaceAction, state: pinState) => {
    action.pins.replace(action.list);
    state.list = action.pins.sort();
    return state;
}

interface toggleAction {
    type: 'TOGGLE_PIN';
    pins: PinSelectable;
    key: string;
}
const togglePin = (action: toggleAction, state: pinState) => {
    action.pins.toggleSelect(action.key);
    return state;
}

export const pinReducer = (state: pinState,
    action: putAction |
        removeAction |
        replaceAction |
        toggleAction |
        getAction |
        newAction) => {

    const newState: pinState = { list: state.list, item: state.item };

    switch (action.type) {
        case PUT_PIN:
            return putPin(action, newState);
        case REMOVE_SELECTED_PINS:
            return removeSelectedPins(action, newState);
        case TOGGLE_PIN:
            return togglePin(action, newState);
        case SELECTED_PIN:
            return getPin(action, newState);
        case NEW_PIN:
            return newPin(action, newState);
        case REPLACE_PINS:
            return replacePins(action, newState);
        default:
            return state;
    }
}