'use client';
import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../Button/Button';

interface ModalProps {
    isOpen?:boolean;
    onClose: ()=>void;
    onSubmit: ()=>void;
    title?:string;
    body?:React.ReactElement;
    footer?:React.ReactElement;
    actionlabel:string;
    disabled?:boolean;
    secondaryAction?:()=>void;
    secondaryActionLabel?:string;
}

export default function Modal(props:ModalProps) {
  
    const {isOpen,onClose,onSubmit,title,body,footer,actionlabel,disabled=false,secondaryAction,secondaryActionLabel} = props

    const [showModal,setShowModal] = useState(isOpen)


    const handleClose = useCallback(()=>{
        if(disabled){
            return ;
        }
        setShowModal(false)
        setTimeout(()=>{
            onClose();
        },300)

    },[disabled,onClose])

    useEffect(()=>{
        setShowModal(isOpen)
    },[isOpen])

    const handleSubmit = useCallback(()=>{
        if (disabled) {
            return ;
        }
        onSubmit()
    },[disabled,onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return ;
        }
        secondaryAction()
      },
      [disabled,secondaryAction],
    )

    if (!isOpen) {
        return null;
    }
    

    return (
    <div className='justify-center items-center flex overflow-hidden fixed inset-0 z-40 focus:outline-none bg-neutral-800/75'  onClick={handleClose}>
        <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto text-sm'>
            <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'} `}>
                <div className='translate h-full lg:h-auto md:h-auto border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rounded' onClick={(e)=>e.stopPropagation()}>
                    <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]' >
                        <button className='p-1 border-0 hover:opacity-70 transition absolute left-10' onClick={handleClose}>
                            <AiOutlineClose />
                        </button>
                        <div className='text-lg font-semibold'>
                            {title}
                        </div>
                    </div>
                    <div className='relative flex-auto p-6'>
                        {body}
                    </div>    
                    <div className='flex flex-col gap-2 px-6 py-3'>
                        <div className='flex flex-row items-center gap-4'>
                            {secondaryAction && secondaryActionLabel && 
                            <Button 
                                outline
                                disabled={disabled}
                                label={secondaryActionLabel}
                                onClick={handleSecondaryAction}
                        />}
                          <Button 
                                disabled={disabled}
                                label={actionlabel}
                                onClick={handleSubmit}
                                small={false}
                        />
                        </div>
                        {footer}
                    </div>
                </div>                
            </div>
        </div>
    </div>
  )
}
