import Image from 'next/image'
import { Inter } from 'next/font/google'
import ClientOnly from './components/ClientOnly';
import Container from './components/Common/Container';
import EmptyState from './components/Common/EmptyState';
import getListings, { IListingParams } from './actions/getlistings';
import ListingCard from './components/Listings/ListingCard';
import getCurrentUser from './actions/getCurrentUser';
import SkeletonBox from './components/Skeleton/SkeletonBox';

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  searchParams:IListingParams
}

export default async function Home({searchParams}:HomeProps) {

  const currentUser = await getCurrentUser()
  const listings =await getListings(searchParams);
   if (listings.length===0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }


  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {listings.map(listing =>(
              <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
            ))}
        </div>
      </Container>
    </ClientOnly>
  )
}
export const dynamic = 'force-dynamic'