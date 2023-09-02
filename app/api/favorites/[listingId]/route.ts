import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"

interface IdParams {
    listingId?: string
}

export async function POST(request:Request,{params}:{params:IdParams}){
        const currentUser = await getCurrentUser()
        if(!currentUser){
            
            return NextResponse.error();
        }

        const {listingId} = params;
        if(!listingId || typeof listingId !== 'string'){
            throw new Error("Invalid Id")
        }

        let favoriteIds = [...(currentUser.favoriteIds || [])];
        favoriteIds.push(listingId)
        const user = await prisma.user.update({
            where: {
                id:currentUser.id
            },
            data:{
                favoriteIds:favoriteIds
            }
        })

        return NextResponse.json(user)
    }

export async function DELETE(request:Request,{params}:{params:IdParams}){
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error();
    }

    const {listingId} = params
    if(!listingId || typeof listingId !== 'string'){
        throw new Error("Invalid Id")
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id)=>id !== listingId);
    const user = await prisma.user.update({
        where:{
            id:currentUser.id
        },
        data:{
            favoriteIds
        }
    })   
      return NextResponse.json(user);
}