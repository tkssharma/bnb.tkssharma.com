'use client'

interface HeadingProps {
    title:string,
    subTitle?:string,
    center?:boolean
}


export default function Heading({center,title,subTitle}:HeadingProps) {
  return (
    <div className={center ? 'text-center': 'text-left'}>
        <div className="text-2xl font-bold">
            {title}
        </div>
        <div className="font-light text-neutral-500">
            {subTitle}
        </div>
    </div>
  )
}
