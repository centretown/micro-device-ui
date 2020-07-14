
import React, { useReducer } from 'react';
import { Action, ActionSelectable } from 'micro-device-modules';
import { createItemContext } from './item-context'
import { ItemState, itemReducer, SelectAction } from './item-reducer';
import { itemSelect } from './item-state';

export const ActionContext =
    React.createContext(createItemContext<Action>());

export const actionReducer = (
    state: ItemState<Action>,
    action: SelectAction<Action>) => {

    return itemReducer<Action>(state, action);
}

interface props {
    actions: ActionSelectable;
    children: JSX.Element | JSX.Element[];
}

export const ActionState = (p: props) => {
    const [state, dispatch] = useReducer(actionReducer, {
        list: p.actions.sort(),
        item: p.actions.newItem(),
    });
    return (
        <ActionContext.Provider
            value={
                itemSelect<Action, ActionSelectable>(p.actions, state, dispatch)
            }>
            {p.children}
        </ActionContext.Provider >
    )
}