import { DeviceStoreable, Device, PinSelectable } from "micro-device-modules";

export const PUT_DEVICE = 'PUT_DEVICE';
export const REMOVE_SELECTED_DEVICES = 'REMOVE_SELECTED_DEVICES';
export const TOGGLE_DEVICE = 'TOGGLE_DEVICE';
export const SELECTED_DEVICE = 'SELECTED_DEVICE';
export const NEW_DEVICE = 'NEW_DEVICE';
export const PUT_DEVICES = 'PUT_DEVICES';
export const SAVE_DEVICES = 'SAVE_DEVICES';
export const LOAD_DEVICES = 'LOAD_DEVICES';

export interface deviceState {
    list: Device[];
    item: Device;
}

export const defaultDevice: Device = {
    ip: "",
    label: "Device #",
    model: "",
    pins: new PinSelectable(),
}

interface newAction {
    type: 'NEW_DEVICE';
    devices: DeviceStoreable;
}
const newDevice = (action: newAction, state: deviceState) => {
    state.item = defaultDevice;
    return state;
}

interface getAction {
    type: 'SELECTED_DEVICE';
    devices: DeviceStoreable;
}
const getDevice = (action: getAction, state: deviceState) => {
    const l = action.devices.getSelected();
    state.item = (l.length > 0) ? l[0] : defaultDevice;
    return state;
}

interface putAction {
    type: 'PUT_DEVICE';
    devices: DeviceStoreable;
    device: Device;
};
const putDevice = (action: putAction, state: deviceState) => {
    action.devices.put(action.device);
    state.list = action.devices.sort();
    return state;
}

interface putListAction {
    type: 'PUT_DEVICES';
    devices: DeviceStoreable;
    list: Device[];
};
const putList = (action: putListAction, state: deviceState) => {
    action.devices.putList(action.list);
    state.list = action.devices.sort();
    return state;
}

interface removeAction {
    type: 'REMOVE_SELECTED_DEVICES';
    devices: DeviceStoreable;
}
const removeSelectedDevices = (action: removeAction, state: deviceState) => {
    action.devices.removeSelected();
    state.list = action.devices.sort();
    return state;
}

interface toggleAction {
    type: 'TOGGLE_DEVICE';
    devices: DeviceStoreable;
    key: string;
}
const toggleDevice = (action: toggleAction, state: deviceState) => {
    action.devices.toggleSelect(action.key);
    return state;
}

interface saveAction {
    type: 'SAVE_DEVICES',
    devices: DeviceStoreable,
}
const saveDevices = (action: saveAction, state: deviceState) => {
    action.devices.save();
    return state;
}

interface loadAction {
    type: 'LOAD_DEVICES',
    devices: DeviceStoreable,
}
const loadDevices = (action: loadAction, state: deviceState) => {
    action.devices.load();
    state.list = action.devices.sort();
    return state;
}

export const deviceReducer = (state: deviceState,
    action: putAction |
        putListAction |
        removeAction |
        toggleAction |
        getAction |
        saveAction |
        loadAction |
        newAction) => {

    const newState: deviceState = { list: state.list, item: state.item };

    switch (action.type) {
        case PUT_DEVICE:
            return putDevice(action, newState);
        case PUT_DEVICES:
            return putList(action, newState);
        case REMOVE_SELECTED_DEVICES:
            return removeSelectedDevices(action, newState);
        case TOGGLE_DEVICE:
            return toggleDevice(action, newState);
        case SELECTED_DEVICE:
            return getDevice(action, newState);
        case NEW_DEVICE:
            return newDevice(action, newState);
        case SAVE_DEVICES:
            return saveDevices(action, newState);
        case LOAD_DEVICES:
            return loadDevices(action, newState);
        default:
            return state;
    }
}

