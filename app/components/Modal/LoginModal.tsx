'use client'
import React from 'react'
import axios from 'axios'   
import { toast } from 'react-hot-toast'
import {FcGoogle} from 'react-icons/fc'
import {useState,useCallback} from 'react'
import {signIn} from 'next-auth/react'
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../Common/Heading'
import Input from '../Inputs/Input'
import Button from '../Button/Button'
import { AiFillGithub } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

export default function LoginModal() {
  
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter()

    const [loading,setLoading] = useState(false)

    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }})
  

   const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setLoading(true)
    signIn('credentials',{
        ...data,
        redirect:false
    }).then((callback)=>{
        setLoading(false)
        if (callback?.ok) {
            toast.success('Login Success!')
            router.refresh();
            loginModal.onClose()
        }
        if (callback?.error) {
            toast.success("Something Went wrong!")
        }
    })
   }     

const toggle = useCallback(()=>{
    loginModal.onClose();
    registerModal.onOpen()
},[loginModal,registerModal])

   const bodyContent = (
    <div className='flex flex-col gap-2'>
        <Heading title='Welcome back' subTitle='Login to your account' />
        <Input id='email' label='Email' type='email' disabled={loading} register={register} errors={errors} required/>
        <Input id='password' label='Password' type='password' disabled={loading} register={register} errors={errors} required/>

    </div>
   )

    const footerContent = (
        <div className='flex flex-col gap-2 py-3 mt-1'>
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={()=>{signIn('google')}}
                disabled={loading}
            />
            <Button 
                disabled={loading}
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={()=>{signIn('github')}}
            />
            <div className='flex flex-row items-center justify-center text-neutral-500'>
                <p>First time here? <span onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>Create an account</span></p>
            </div>
        </div>
    )

    return (
        <Modal 
        disabled={loading} 
        isOpen={loginModal.isOpen} 
        title='Login' 
        actionlabel='Continue' 
        onClose={loginModal.onClose} 
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
  )
}
