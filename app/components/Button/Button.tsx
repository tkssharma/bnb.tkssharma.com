'use client';
import React from 'react'
import { IconType } from 'react-icons/lib';

interface ButtonProps {
    label:string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>)=>void;
    disabled: boolean;
    outline?: boolean;
    small?:boolean;
    icon?:IconType

}

export default function Button({label,onClick,disabled,outline,small,icon:Icon}:ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${outline ? 'bg-white':'bg-rose-500'}  ${outline ? 'border-black':'border-rose-500'} ${outline ? 'text-black':'text-white'}
    ${small ? 'px-2 py-1':'px-4 py-2'}  ${small ? 'text-sm':'text-md'} ${small ? 'font-light':'font-semibold'} ${small ? 'border-[1px]':'border-2'} `}>
        {Icon && <Icon size={24} className='absolute left-2 top-2' />}
        {label}
    </button>
  )
}
