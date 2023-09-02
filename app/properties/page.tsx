import React from 'react'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import EmptyState from '../components/Common/EmptyState'
import getReservations from '../actions/getReservations'
import PropertiesClient from './PropertiesClient'
import getListings from '../actions/getlistings'

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
    const listings = await getListings({userId:currentUser.id})

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Properties' subtitle='Looks like you have not listed any of your property'/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient currentUser={currentUser} listings={listings}  />
        </ClientOnly>
  )
}
