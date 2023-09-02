'use client'
import React from 'react'
import axios from 'axios'   
import { toast } from 'react-hot-toast'
import {FcGoogle} from 'react-icons/fc'
import {useState,useCallback} from 'react'
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import {signIn} from 'next-auth/react'
import Modal from './Modal'
import Heading from '../Common/Heading'
import Input from '../Inputs/Input'
import Button from '../Button/Button'
import { AiFillGithub } from 'react-icons/ai'
import useLoginModal from '@/app/hooks/useLoginModal'

export default function RegisterModal() {
  
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [loading,setLoading] = useState(false)

    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }})
  

   const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setLoading(true)
    axios.post('/api/register',data)
    .then(()=>{
        registerModal.onClose()
        toast.success("Account created!")
        toast.success("Please login using account!")
        loginModal.onOpen()
    })
    .catch(()=>(toast.error('Something went wrong')))
    .finally(()=>setLoading(false))
   }     
const toggle = useCallback(()=>{
    registerModal.onClose();
    loginModal.onOpen()
},[loginModal,registerModal])

   const bodyContent = (
    <div className='flex flex-col gap-2'>
        <Heading title='Welcome to Airbnb' subTitle='Create an account' />
        <Input id='email' label='Email' type='email' disabled={loading} register={register} errors={errors} required/>
        <Input id='name' label='Name' disabled={loading} register={register} errors={errors} required/>
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
                <p>Already have an account? <span onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>Log in</span></p>
            </div>
        </div>
    )

    return (
        <Modal 
        disabled={loading} 
        isOpen={registerModal.isOpen} 
        title='Register' 
        actionlabel='Continue' 
        onClose={registerModal.onClose} 
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
  )
}
