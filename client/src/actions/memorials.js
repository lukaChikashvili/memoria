"use server"

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

async function fileToBase64(file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return buffer.toString("base64");
  }

export async function AddMemorialToDB({memorialData, images}) {
    try {
      const user = await checkUser();

    
       


        if(!user) throw new Error("User not found");

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

      const { data, error } = await supabase.storage.
      from("memoria-images").upload(filePath, imageBuffer, {
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

      const memorial = await db.deadPeople.create({
        data: {
          id: memorialId,
          fullName: memorialData.fullName,
          birthYear: memorialData.birthYear,
          deathYear: memorialData.deathYear,
          biography: memorialData.biography,
          images: imageUrls,
          funeralPlace: memorialData.funeralPlace,
          createdById: user.id,
          createdAt: new Date(), 
        }
      });

      revalidatePath('/memorials');
  

      return {
        success: true,
      };

    

        
    } catch (error) {
        throw new Error("Error adding car:" + error.message);
    }
}