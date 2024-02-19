import { create } from "zustand";

interface ListPropertyModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useListPropertyModal = create<ListPropertyModalStore>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useListPropertyModal;