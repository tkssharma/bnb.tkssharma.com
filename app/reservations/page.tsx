import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/Common/EmptyState"
import ReservationClient from "./ReservationClient"



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

    const reservations = await getReservations({authorId:currentUser.id})

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Reservations' subtitle='Looks like no one has made any reservations on your property'/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
  )
}
