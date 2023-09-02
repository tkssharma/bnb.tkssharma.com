'use client'


import React, { useEffect } from 'react'
import Container from './components/Common/Container'
import EmptyState from './components/Common/EmptyState'
import ClientOnly from './components/ClientOnly'

interface ErrorStateProps {
  error: Error
}

export default function Error({error}:ErrorStateProps) {


  useEffect(()=>{
    console.error(error)
  },[error])

  return (
    <ClientOnly>
      <Container>
        <EmptyState
        title='Opps!!'
        subtitle='Something went wrong, please load the app again.'
        />
      </Container>
    </ClientOnly>
  )
}
