"use server"

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { userAgent } from "next/server";
import { v4 as uuidv4 } from "uuid";

async function fileToBase64(file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return buffer.toString("base64");
  }


// add body to db
  export async function addBody({ bodyColor, hair, eye }) {
    const { userId } = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });

    const existingBody = await db.body.findFirst({
      where: {
        userId: user.id
      }
    });

    if(existingBody) {
      const updatedBody = await db.body.update({
        where: {
          id: existingBody.id
        },
        data: {
          bodyColor,
          hair,
          eye,
        },
      });
      return { success: true, data: updatedBody };
    }else {
      const newBody = await db.body.create({
        data: {
          bodyColor,
          hair,
          eye,
          userId: user.id
        },
      });
    
      return { success: true, data: newBody };

    }

  
    
  }

// get body from db
  export async function getBody() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: { memorials: true }
    });
  
    return user?.memorials?.[0] ?? null;
  }


// add cloth to db
  export async function addCloth({ shirt, shirtTexture, skirt, 
    skirtTexture, removeSkirt, removeShirt, removeHair }) {
    const { userId } = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
    });

    
    const existingCloth = await db.cloth.findFirst({
      where: {
        userId: user.id
      }
    });

    if(existingCloth) {
      const updatedCloth = await db.cloth.update({
        where: {
          id: existingCloth.id
        },
        data: {
          shirt, shirtTexture, skirt, 
          skirtTexture, removeSkirt, removeShirt, removeHair,
        },
      });
      return { success: true, data: updatedCloth };

    }else {
    
      const newCloth = await db.cloth.create({
        data: {
          shirt, shirtTexture, skirt, 
         skirtTexture, removeSkirt, removeShirt, removeHair,
          userId: user.id
        },
      });

      return { success: true, data: newCloth };
    }


    
    }

  
    
  