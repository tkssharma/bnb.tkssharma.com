import prisma from "@/app/libs/prismadb";

export interface IListingParams {
    userId?:string;
    guestCount?:string;
    roomCount?:string;
    bathroomCount?:string;
    startDate?:string;
    endDate?:string;
    category?:string;
    locationValue?:string;
}



export default async function getListings(params:IListingParams){
    try {

        const {userId,bathroomCount,category,endDate,guestCount,locationValue,roomCount,startDate} = params
        let query:any = {}

        if (userId) {
                query.userId=userId
        }
        if (category) {
                query.category=category
        }
        if (locationValue) {
                query.locationValue=locationValue
        }
        if (roomCount) {
            query.roomCount={
                gte:+roomCount
            }
        }
        if (bathroomCount) {
            query.bathroomCount={
                gte:+bathroomCount
            }
        }
        if (guestCount) {
            query.guestCount={
                gte:+guestCount
            }
        }
        if (startDate && endDate) {
            query.NOT = {
                reservations:{
                    some:{
                        OR:[
                            {
                                endDate:{gte:startDate},
                                startDate:{lte:startDate},
                            },
                                                        {
                                startDate:{lte:endDate},
                                endDate:{gte:endDate},
                            }
                        ]
                    }
                }
            }
        }

        

        const listings = await prisma.listing.findMany({
            where:query,
            orderBy:{
                createdAt:'desc'
            }
        })
        const safeListings = listings.map((listing)=>({
            ...listing,
            createdAt:listing.createdAt.toISOString()
        }))
        return safeListings;
    } catch (error:any) {
        throw new Error(error)
    }
}