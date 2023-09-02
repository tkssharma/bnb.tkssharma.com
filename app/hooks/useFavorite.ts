import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";


interface IuseFavorite {
    listingId: string;
    currentUser: SafeUser | null;
}

const useFavorite = ({listingId,currentUser}:IuseFavorite) =>{
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    },[currentUser,listingId])

    const toggleFavorite = useCallback(async(e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        if (!currentUser) {
            return loginModal.onOpen();
        }
        try {
            if (hasFavorited) {
                axios.delete(`api/favorites/${listingId}`)
                .then(()=>{toast.success("Listing removed from Favorites")})
                .catch(()=>{toast.error("Something went wrong!")})
            }
            else{
                axios.post(`api/favorites/${listingId}`)
                .then(()=>{toast.success("Listing added to Favorites")})
                .catch(()=>{toast.error("Something went wrong!")})
            }
            router.refresh()
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    },[currentUser,hasFavorited,listingId,loginModal,router])

    return {
        hasFavorited,toggleFavorite
    }
}

export default useFavorite

