import { ItemStoreContext, ItemContext } from "../context/item-context";

export const itemUi = <T>(
    context: ItemStoreContext<T> | ItemContext<T>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    return ({
        addClicked: () => {
            context.select.newItem();
            setModal(true);
        },

        editClicked: () => {
            context.select.getFirstSelection();
            setModal(true);
        },

        removeClicked: () => {
            context.select.removeSelected();
        },

        close: () => {
            setModal(false);
        },

        submit: (t: T) => {
            setModal(false);
            context.select.put(t);
        },
    });
}