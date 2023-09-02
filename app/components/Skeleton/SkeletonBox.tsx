

export default function SkeletonBox() {
  return (
        <div className="col-span-1 cursor-not-allowed flex flex-col gap-2 animate-pulse">
    
        <div className="aspect-square w-full  rounded-xl bg-neutral-200">
            {/* Image container */}
        </div>
         
        <div className="p-2 bg-neutral-200 rounded-md ">
            {/*first text container*/}
        </div>        
        <div className="p-2 bg-neutral-200 rounded-md ">
            {/*second text container*/}
        </div>
        <div className="p-2 bg-neutral-200 rounded-md ">
            {/*third text container*/}

        </div>

         </div>
  )
}
