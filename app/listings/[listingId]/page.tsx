import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/Common/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams {
    listingId?:string
}

export default async function page({params}:{params:IParams}) {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser()
    if(listing === null){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
    <ClientOnly>
        <ListingClient listing={listing} reservations={reservations} currentUser={currentUser}/>
    </ClientOnly>
  )
}
