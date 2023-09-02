import ClientOnly from "./components/ClientOnly";
import Container from "./components/Common/Container";
import SkeletonBox from "./components/Skeleton/SkeletonBox";

const skeletonArray =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

export default function loading() {
  return (
     <div className="pb-20">
          <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {skeletonArray.map((item,index)=><SkeletonBox key={index} />)}
        </div>
      </Container>
    </ClientOnly>
        </div>
  )
}
