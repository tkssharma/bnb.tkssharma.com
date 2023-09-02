'use client'
import { SafeReservation, SafeUser } from '../types'
import Container from '../components/Common/Container';
import Heading from '../components/Common/Heading';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/Listings/ListingCard';

interface ReservationClient {
    reservations:SafeReservation[];
    currentUser:SafeUser | null
}

export default function ReservationClient({currentUser,reservations}:ReservationClient) {

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
                title='Reservations'
                subTitle='Bookings on your Properties'
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations && reservations.map((reservation)=>(
            <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                currentUser={currentUser}
                actionLabel="Cancel Guest Reservation"
                disabled={deletingId===reservation.id}
                onAction={onCancel}
            />
            
            ))}
        </div>
    </Container>
  )
}
