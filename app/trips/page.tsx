import React from 'react'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/Common/EmptyState'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'

export default async function page() {
 
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return 
         <ClientOnly>
            <EmptyState
                title='Unauthorized'
                subtitle='Please login'
            />
    </ClientOnly>
    }
    const reservations = await getReservations({userId:currentUser.id})

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Reservations' subtitle='Please make new reservations'/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient currentUser={currentUser} reservations={reservations}  />
        </ClientOnly>
  )
}
