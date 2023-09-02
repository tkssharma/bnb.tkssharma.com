'use client'

import React from 'react'
import { IconType } from 'react-icons'

interface ListingCategoryTypes {
    icon:IconType;
    label:string;
    description:string,
}

export default function ListingCategory({description,icon:Icon,label}:ListingCategoryTypes) {
  return (
    <div className='flex flex-col gap-6'>
        <div className='flex flex-row items-center gap-4'>
            <Icon size={32} className='text-neutral-600' />
            <div className='flex flex-col text-md font-semibold'>
                <div className='text-md font-semibold'>
                    {label}
                </div>
                <div className='text-neutral-500 font-light'>
                    {description}
                </div>
            </div>
        </div>
    </div>
  )
}
