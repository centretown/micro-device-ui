import React, { useReducer } from "react";
import { deviceReducer, defaultDevice, TOGGLE_DEVICE, deviceState, PUT_DEVICE } from "../device-reducer";
import { DeviceStoreable, PinSelectable, Device } from "micro-device-modules";

test(`device reducer`, () => {
    const list: Device[] = [
        {
            ip: '192.168.1.200',
            model: 'nano',
            label: '',
            pins: new PinSelectable(),
        },
        {
            ip: '192.168.1.218',
            model: 'esp32',
            label: '',
            pins: new PinSelectable(),
        },
        {
            ip: '192.168.1.217',
            model: 'esp32',
            label: '',
            pins: new PinSelectable(),
        },
    ];


    const p = new DeviceStoreable();
    const key = p.key(list[0]);
    let state: deviceState = { list: list, item: defaultDevice };

    state = deviceReducer(state, { type: TOGGLE_DEVICE, devices: p, key: key });

    console.log(p.getSelected());

});