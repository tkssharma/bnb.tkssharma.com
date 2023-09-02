'use client'

import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { Listing, Reservation } from '@prisma/client'
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import HeartButton from '../Common/HeartButton';
import Button from '../Button/Button';
import getListingById from '@/app/actions/getListingById';

interface ListingCardProps{
    data:SafeListing;
    reservation?:SafeReservation;
    onAction?:(id:string) => void;
    disabled?: boolean;
    actionLabel?:string;
    actionId?:string;
    currentUser:SafeUser | null
}


export default function ListingCard({data,reservation,actionId="",actionLabel,currentUser,disabled=false,onAction}:ListingCardProps) {
 
    const router = useRouter()
    const {getByValue} = useCountries()

    const location = getByValue(data.locationValue)

    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation();
        if (disabled) {
            return ;
        }
        onAction?.(actionId);
    },[onAction,actionId,disabled])
 

    const price = useMemo(()=>{
        if (reservation) {
            return reservation.totalPrice
        }
        return data.price
    },[reservation,data.price])


    const reservationDate = useMemo(()=>{
        if (!reservation) {
            return null
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start,'PP')} - ${format(end,'PP')}`

    },[reservation])



    return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-1 w-full">
        <div 
          className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-bold text-md ">
       {location?.label}, {location?.region}
        </div>
        <div className="font-light text-neutral-500 text-sm">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center text-sm">
          <div className="font-semibold">
            $ {price}/
          </div>
          {!reservation && (
            <div className="font-semibold">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}
