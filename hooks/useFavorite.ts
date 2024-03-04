import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import toast from "react-hot-toast";

import { SafeUser } from "@/types";


import useLoginModal from "./useLoginModal";

interface IUseFavoriite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavoriite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            if (hasFavorited) {
                await axios.delete(`/api/favorites/${listingId}`);
                router.refresh();
                toast.success('Removed from favorites');
            } else {
                await axios.post(`/api/favorites/${listingId}`)
                router.refresh();
                toast.success('Added to favorites');
            }

        } catch (error) {
            toast.error('Something went wrong.');
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;