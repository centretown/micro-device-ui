import { ItemStoreContext, ItemContext } from "../context/item-context";

export const itemUi = <T>(
    context: ItemStoreContext<T> | ItemContext<T>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const save = () => {
        const ctx = context as ItemStoreContext<T>;
        if (ctx.store) {
            ctx.store.save();
            console.log("I've been SAVED!\n", ctx.select);
        }
    };

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
            save();
        },

        close: () => {
            setModal(false);
        },

        submit: (t: T) => {
            setModal(false);
            context.select.put(t);
            save();
        },
    });
}