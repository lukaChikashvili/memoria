"use server"

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { createClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

async function fileToBase64(file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return buffer.toString("base64");
  }



  export async function addBody({ bodyColor, hair, eye }) {
    const { userId } = auth();
  
    if (!userId) {
      throw new Error('Unauthorized');
    }
  
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const body = await prisma.body.create({
      data: {
        bodyColor,
        hair,
        eye,
        userId: user.id,
      },
    });
  
    return body;
  }