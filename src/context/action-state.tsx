
import { createItemContext } from './item-context'
import React, { useReducer } from 'react';
import { Action, ActionSelectable } from 'micro-device-modules';
import { ItemState, itemReducer, SelectAction, NEW } from './item-reducer';
import { itemSelect } from './item-state';

export const ActionContext =
    React.createContext(createItemContext<Action>());

export const actionReducer = (
    state: ItemState<Action>,
    action: SelectAction<Action>) => {

    return itemReducer(state, action);
}

const defaultAction: Action = {
    sequence: 0,
    action: '',
    type: ''
}

interface props {
    actions: ActionSelectable;
    children: JSX.Element | JSX.Element[];
}

export const ActionState = (p: props) => {
    const [state, dispatch] = useReducer(actionReducer, {
        list: p.actions.sort(),
        item: defaultAction
    });
    return (
        <ActionContext.Provider
            value={itemSelect<Action, ActionSelectable>(p.actions, state, dispatch)}>
            {p.children}
        </ActionContext.Provider >
    )
}