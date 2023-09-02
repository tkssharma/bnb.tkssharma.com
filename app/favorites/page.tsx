import getCurrentUser from "../actions/getCurrentUser"
import getFavoritesListings from "../actions/getFavoriteListings"
import getReservations from "../actions/getReservations"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/Common/EmptyState"
import FavoritesClient from "./FavoritesClient"



export default async function page() {
  
    const currentUser = await getCurrentUser()

    if (currentUser===null) {
        return 
         <ClientOnly>
            <EmptyState
                title='Unauthorized'
                subtitle='Please login'
            />
    </ClientOnly>
    }
    
    const favorites = await getFavoritesListings()

    if (favorites.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title='No Favorites' subtitle='Bookmark a property as favorite to add it to your Favorites'/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient favorites={favorites} currentUser={currentUser} />
        </ClientOnly>
  )
}
