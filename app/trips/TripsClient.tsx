'use client'

import { SafeReservation, SafeUser } from "../types"
import Heading from "../components/Common/Heading";
import Container from "../components/Common/Container";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/Listings/ListingCard";

interface TripsClientProps{
    reservations:SafeReservation[];
    currentUser: SafeUser | null
}

export default function TripsClient({currentUser,reservations}:TripsClientProps) {

    const router = useRouter()
    const [deletingId,setDeletingId] = useState('')

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id)
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation Cancelled")
            router.refresh()
        })
        .catch(()=>toast.error("Something went wrong"))
        .finally(()=>setDeletingId(''))
    },[deletingId,router])

  return (
    <Container>
        <Heading
            title="Trips"
            subTitle="Where have you been and where are you going next!"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations && reservations.map((reservation)=>(
            <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                currentUser={currentUser}
                actionLabel="Cancel Reservation"
                disabled={deletingId===reservation.id}
                onAction={onCancel}
            />
            
            ))}
        </div>
    </Container>
  )
}
