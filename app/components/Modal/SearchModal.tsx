'use client'
import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useSearchParams ,useRouter} from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../Inputs/CountrySelect'
import qs from 'query-string'
import { formatISO } from 'date-fns'
import Heading from '../Common/Heading'
import Calendar from '../Inputs/Calendar'
import Counter from '../Inputs/Counter'

enum STEPS{
    LOCATION=0,
    DATE=1,
    INFO=2
}

export default function SearchModal() {
  
  const searchModal = useSearchModal()
  const router = useRouter()
  const params = useSearchParams()

  const [step,setStep] = useState(STEPS.LOCATION);
  const [guestCount,setGuestCount] = useState(1);
  const [roomCount,setRoomCount] = useState(1);
  const [bathroomCount,setBathroomCount] = useState(1);
  const [location,setLocation] = useState<CountrySelectValue>()

  const [dateRange,setDateRange] = useState<Range>({
    startDate:new Date(),
    endDate:new Date(),
    key:'selection'
  })

  const Map = useMemo(()=>dynamic(()=>import('../Common/Map'),{ssr:false}),[location])

  const onBack = useCallback(()=>{
    setStep((value)=>value-1)
  },[])

  const onNext = useCallback(()=>{
    setStep(value=>value+1)
  },[])

  const onSubmit = useCallback(async()=>{
    if (step !== STEPS.INFO) {
        return onNext()
    }
    let currentQuery = {}

    if (params) {
        currentQuery = qs.parse(params.toString())
    }
    const updatedQuery:any = {
        ...currentQuery,
        locationValue:location?.value,
        guestCount,
        roomCount,
        bathroomCount
    }

    if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
        url:'/',
        query:updatedQuery},
        {skipNull:true});

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  },[step,searchModal,roomCount,guestCount,bathroomCount,location,router,dateRange,onNext,params])

  const actionLabel = useMemo(()=>{
    if (step === STEPS.INFO) {
        return 'Search'
    }
    return 'Next'
  },[step])



const secondaryActionLabel = useMemo(()=>{
    if (step === STEPS.INFO) {
        return undefined
    }
    return 'Back'
  },[step])


  let bodyContent = (
    <div className='flex flex-col gap-8'>
        <Heading
            title='Where do you wanna go?'
            subTitle='Find the perfect location'
        />
        <CountrySelect 
        value={location} 
        onChange={(value) => 
          setLocation(value as CountrySelectValue)} 
      />
        <hr/>
        <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
     bodyContent = (
    <div className='flex flex-col gap-8'>
        <Heading
            title='When do you want to go?'
            subTitle='Select a feasible date range'
        />
        <hr/>
        <Calendar
        value={dateRange}
        onChange={(value)=>setDateRange(value.selection)}
        
        />
    </div>
  )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
    <div className='flex flex-col gap-8'>
        <Heading
            title='What do you want?'
            subTitle='Select prefered property type'
        />
        <hr/>
        <Counter 
            title='Guests'
            subtitle='How many guests allowed?'
            value={guestCount}
            onChange={(value)=>setGuestCount(value)}
        />
        <Counter 
            title='Rooms'
            subtitle='How many rooms present in property?'
            value={roomCount}
            onChange={(value)=>setRoomCount(value)}
        />
        <Counter 
            title='Bathrooms'
            subtitle='How many bathrooms present in property?'
            value={bathroomCount}
            onChange={(value)=>setBathroomCount(value)}
        />
    </div>
  )
  }

    return (
    <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title='Filters'
        actionlabel={actionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined :onBack}
        secondaryActionLabel={secondaryActionLabel}
        body={bodyContent}
    />
  )
}
