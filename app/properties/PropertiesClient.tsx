'use client'

import { SafeListing, SafeReservation, SafeUser } from "../types"
import Heading from "../components/Common/Heading";
import Container from "../components/Common/Container";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface PropertiesClientProps{
    listings:SafeListing[];
    currentUser: SafeUser | null
}

export default function PropertiesClient({currentUser,listings}:PropertiesClientProps) {

    const router = useRouter()
    const [deletingId,setDeletingId] = useState('')

    const onDelete = useCallback((id:string)=>{
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success("Listing deleted")
            router.refresh()
        })
        .catch(()=>toast.error("Something went wrong"))
        .finally(()=>setDeletingId(''))
    },[deletingId,router])

  return (
    <Container>
        <Heading
            title="Properties"
            subTitle="Here is a list of all your properties listed on Airbnb"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings && listings.map((listing)=>(
            <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
                actionId={listing.id}
                onAction={onDelete}
                disabled={deletingId===listing.id}
                actionLabel="Delete Property"
              />
            
            ))}
        </div>
    </Container>
  )
}
