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


// add body to db
export async function addBody({ bodyColor, hair, eye }) {
  const user = await checkUser(); 

  if (!user) {
    throw new Error("User not found or unauthorized");
  }

  const existingBody = await db.body.findFirst({
    where: {
      userId: user.id
    }
  });

  if (existingBody) {
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
  } else {
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
      const user = await checkUser(); 

      if (!user) {
        throw new Error("User not found or unauthorized");
      }

   

    
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

  
    
  // get cloth from db
  export async function getCloth() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: { cloth: true }
    });
  
    return user?.cloth?.[0] ?? null;
  }


// add screenshots
export async function addScreenShots(images) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const memorialId = uuidv4();
    const folderPath = `memorials/${memorialId}`;

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const base64Data = images[i];

      if (!base64Data || !base64Data.startsWith("data:image/")) {
        console.warn("Skipping invalid image data");
        continue;
      }

      const base64 = base64Data.split(",")[1];
      const imageBuffer = Buffer.from(base64, "base64");

      const mimeMatch = base64Data.match(/data:image\/([a-zA-Z0-9]+);/);
      const fileExtension = mimeMatch ? mimeMatch[1] : "jpeg";

      const fileName = `image-${Date.now()}-${i}.${fileExtension}`;
      const filePath = `${folderPath}/${fileName}`;

      const { data, error } = await supabase.storage
        .from("memoria-images")
        .upload(filePath, imageBuffer, {
          contentType: `image/${fileExtension}`,
        });

      if (error) {
        console.error("Error uploading image:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/memoria-images/${filePath}`;
      imageUrls.push(publicUrl);
    }

    if (imageUrls.length === 0) {
      throw new Error("No valid images were uploaded");
    }

 
    const screenshotEntries = await Promise.all(
      imageUrls.map((url) =>
        db.screenshot.create({
          data: {
            url,
            userId: user.id, 
          },
        })
      )
    );

    return screenshotEntries.map((entry) => entry.url); 
  } catch (error) {
    console.error("Error in addScreenShots:", error);
    throw new Error(`Failed to add screenshots: ${error.message}`);
  }
}

export async function getScreenShots() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId
    },
    include: {
      screenshots: true, 
    }
  });

  if (!user) throw new Error("User not found");

  return user.screenshots.map((screenshot) => screenshot.url); 
}