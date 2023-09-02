'use client'

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react'
import Heading from '../Common/Heading';
import Image from 'next/image';
import HeartButton from '../Common/HeartButton';

interface ListingHeadProps {
    title:string;
    locationValue:string;
    imageSrc:string;
    id:string;
    currentUser: SafeUser | null

}

export default function ListingHead({id,imageSrc,locationValue,title,currentUser}:ListingHeadProps) {
  
  const {getByValue} = useCountries()
const location = getByValue(locationValue)
  
    return (
    <div>
        <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
        />
        <div className='w-full h-[40vh] md:h-screen xl:h-[60vh] overflow-hidden rounded-xl relative mt-4'>
            <Image
                alt='Image'
                src={imageSrc}
                fill
                className='object-cover w-full'
            />
            <div className='absolute top-5 right-5'>
                <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
    </div>
  )
}
