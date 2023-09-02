import ClientOnly from '@/app/components/ClientOnly'
import Container from '@/app/components/Common/Container'
import React from 'react'

export default function loading() {
  return (
     <ClientOnly>
        <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="h-20 bg-neutral-200 mb-4 rounded-md animate-pulse">
        </div>
        <div className='w-full h-[40vh] md:h-screen xl:h-[60vh]  overflow-hidden rounded-xl mt-4 bg-neutral-200 animate-pulse' >
        </div>
        <div 
            className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5 " >
            <div className="h-96 bg-neutral-200 animate-pulse rounded-xl">
              
            </div>
              <div className="bg-neutral-200 animate-pulse h-60 rounded-xl"></div>
          </div>
      </div>
    </Container>
    </ClientOnly>
  )
}
