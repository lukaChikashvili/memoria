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
      return updatedBody;
    }else {
      const newBody = await db.body.create({
        data: {
          bodyColor,
          hair,
          eye,
          userId: user.id
        },
      });
    
      return newBody;

    }

  
    
  }


  export async function getBody() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: { memorials: true }
    });
  
    return user?.memorials?.[0] ?? null;
  }