import React from 'react'
import { SafeListing, SafeReservation, SafeUser } from '../types';
import Container from '../components/Common/Container';
import Heading from '../components/Common/Heading';
import ListingCard from '../components/Listings/ListingCard';

interface FavoritesClientProps {
    favorites:SafeListing[];
    currentUser:SafeUser | null
}

export default function FavoritesClient({favorites,currentUser}:FavoritesClientProps) {



  return (
     <Container>
            <Heading
                title='Favorites'
                subTitle='Listing all your favorite properties'
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {favorites && favorites.map((favorite)=>(
            <ListingCard
                key={favorite.id}
                data={favorite}
                currentUser={currentUser}
            />
            
            ))}
        </div>
    </Container>
  )
}
