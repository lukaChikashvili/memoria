"use client"

import { toast } from "sonner";
import { z } from "zod"

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useFetch from "@/hooks/use-fetch";
import { AddMemorialToDB } from "@/actions/memorials";
import { useAuth } from "@clerk/nextjs";




export default function MemorialForm () {

    const [imageError, setImageError] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const { isSignedIn } = useAuth();

    const router = useRouter();
    
    const memorialSchema = z.object({
        fullName: z.string().min(1, "სახელის შევსება აუცილებელია"), 
        birthYear: z
        .number()
        .int("წელი უნდა იყოს მთელი რიცხვი")
        .gte(1900, "წელი უნდა იყოს 1900 ან მეტი")
        .lte(new Date().getFullYear() + 1, "წელი არ უნდა აღემატებოდეს მიმდინარე წელს")
        .optional()
        .or(z.literal(null)),
      deathYear: z
        .number()
        .int("წელი უნდა იყოს მთელი რიცხვი")
        .gte(1900, "წელი უნდა იყოს 1900 ან მეტი")
        .lte(new Date().getFullYear() + 1, "წელი არ უნდა აღემატებოდეს მიმდინარე წელს")
        .optional()
        .or(z.literal(null)),
        biography: z.string().optional(),
        funeralPlace: z.string().optional(),
      });


      const onMultiImagesDrop = useCallback((acceptedFiles) => {
        const validFiles = acceptedFiles.filter((file) => {
          if (file.size > 5 * 1024 * 1024) {
            toast.error(`${file.name} exceeds 5MB limit and will be skipped`);
            return false;
          }
          return true;
        });
    
        if (validFiles.length === 0) return;

        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
    
          if (progress >= 100) {
            clearInterval(interval);
    
            
            const newImages = [];
            validFiles.forEach((file) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                newImages.push(e.target.result);
    
                
                if (newImages.length === validFiles.length) {
                  setUploadedImages((prev) => [...prev, ...newImages]);
                  setUploadProgress(0);
                  setImageError("");
                  toast.success(
                    `წარმატებით აიტვირთა ${validFiles.length} სურათი`
                  );
                }
              };
              reader.readAsDataURL(file);
            });
          }
        }, 200);
      }, []);

      const {
        getRootProps: getMultiImageRootProps,
        getInputProps: getMultiImageInputProps,
      } = useDropzone({
        onDrop: onMultiImagesDrop,
        accept: {
          "image/*": [".jpeg", ".jpg", ".png", ".webp"],
        },
        multiple: true,
      });


      const {
        loading: memorialLoading,
        fn: addMemorial,
        data: memorialResult
      } = useFetch(AddMemorialToDB);

      useEffect(() => {
        if(memorialResult?.success) {
          toast.success("მემორიალი შეიქმნა წარმატებით");
          router.push("/memorials/showmemorials");
        }
    }, [memorialResult, router])

        
    const {
        register,
        setValue,
        getValues,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        resolver: zodResolver(memorialSchema)


    });


    

    const removeImage = (index) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
      };

   
      const onSubmit = async(data) => {

        if (!isSignedIn) {
            toast.error("გთხოვთ გაიაროთ ავტორიზაცია");
            router.push("/sign-in");
            return;
          }
         
        const memorialData = {
            ...data,
            birthYear: data.birthYear ? parseInt(data.birthYear) : null,
            deathYear: data.deathYear ? parseInt(data.deathYear) : null,


        };

        await addMemorial({
            memorialData,
            images: uploadedImages
        });
       

    
      }


    return (
        <div className="max-w-4xl mx-auto shadow-lg">
            <Card className="max-w-7xl mx-auto mt-10 shadow-lg">
  <CardHeader className="text-center">
    <CardTitle className="text-3xl font-bold text-gray-800">შექმენით მემორიალი</CardTitle>
    <CardDescription className="text-gray-500 mt-2">
      შეავსეთ ფორმა რათა შექმნათ გარდაცვლილის მემორიალის გვერდი
    </CardDescription>
  </CardHeader>

  <CardContent>
    <form className="space-y-10" onSubmit={ handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Full Name */}
    <div className="space-y-2">
      <Label htmlFor="fullName">სრული სახელი</Label>
      <Input
        id="fullName"
        {...register("fullName")}
        placeholder="მაგ: კუკური კილასონია"
        className={errors.fullName ? "border-red-500" : ""}
      />
      {errors.fullName && (
        <p className="text-xs text-red-500">{errors.fullName.message}</p>
      )}
    </div>

    {/* Birth Date */}
<div className="space-y-2">
  <Label htmlFor="birthYear">დაბადების წელი</Label>
  <Input
    type="number"
    id="birthYear"
    {...register('birthYear', {
        required: "დაბადების წელი აუცილებელია",
        min: {
          value: 1900,
          message: "წელი უნდა იყოს 1900 ან მეტი"
        },
        max: {
          value: new Date().getFullYear() + 1,
          message: "წელი არ უნდა აღემატებოდეს მიმდინარე წელს"
        },
        valueAsNumber: true, 
      })}
    placeholder="...შეიყვანეთ წელი (მაგ: 1965)"
    className={errors.birthYear ? "border-red-500" : ""}
  />
  {errors.birthYear && (
    <p className="text-xs text-red-500">{errors.birthYear.message}</p>
  )}
</div>

{/* Death Date */}
<div className="space-y-2">
  <Label htmlFor="deathYear">გარდაცვალების წელი</Label>
  <Input
    type="number"
    id="deathYear"
    {...register('deathYear', {
        required: "გარდაცვალების წელი აუცილებელია",
        min: {
          value: 1900,
          message: "წელი უნდა იყოს 1900 ან მეტი"
        },
        max: {
          value: new Date().getFullYear() + 1,
          message: "წელი არ უნდა აღემატებოდეს მიმდინარე წელს"
        },
        valueAsNumber: true, 
      })}
    placeholder="...შეიყვანეთ წელი (მაგ: 1965)"
    className={errors.deathYear ? "border-red-500" : ""}
  />
  {errors.deathYear && (
    <p className="text-xs text-red-500">{errors.deathYear.message}</p>
  )}
</div>

    {/* Funeral Place */}
    <div className="space-y-2">
      <Label htmlFor="funeralPlace">დასაფლავების ადგილი</Label>
      <Input
        id="funeralPlace"
        {...register("funeralPlace")}
        placeholder="მაგ: ძმათა სასაფლაო"
      />
    </div>


    {/* Biography */}
    <div className="space-y-2 md:col-span-2 lg:col-span-3">
      <Label htmlFor="biography">ბიოგრაფია</Label>
      <textarea
        id="biography"
        {...register("biography")}
        rows="5"
        className="w-full border rounded p-2"
        placeholder="დაწერეთ მოკლე ბიოგრაფია..."
      />
    </div>
      </div>

     
      <div className="flex flex-col gap-4">
        <Label htmlFor="images" className={`text-lg font-medium ${imageError ? "text-red-500" : ""}`}>
          სურათები {imageError && <span className="text-red-500">*</span>}
        </Label>

        <div
          {...getMultiImageRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 transition 
          ${imageError ? "border-red-500" : "border-gray-300"} flex flex-col items-center justify-center gap-2`}
        >
          <input {...getMultiImageInputProps()} />
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-sm text-gray-600">ატვირთეთ ან ჩააგდეთ გარდაცვლილის სურათები</p>
          <p className="text-xs text-gray-500">(JPG, PNG, WebP, მაქსიმუმ 5 მეგაბაიტი)</p>
        </div>

        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-yellow-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {imageError && (
          <p className="text-xs text-red-500 mt-1">{imageError}</p>
        )}
      </div>

      {/* Uploaded Images Section */}
      {uploadedImages.length > 0 && (
        <div className="w-full">
          <h3 className="text-base font-semibold mb-2 text-gray-700">
            ატვირთული სურათები ({uploadedImages.length})
          </h3>
          <div className="flex flex-wrap gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group w-40 h-28">
                <Image
                  src={image}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}


          </div>

         
        </div>
      )}

                  <button 
                  type="submit"
                  
                  className="w-full  md:w-auto cursor-pointer "
                  disabled={memorialLoading}
                  
                  
                  
                >
                  {memorialLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      იქმნება მემორიალი...
                    </>
                  ) : (
                    "შექმენი მემორიალი"
                  )}
                </button>
    </form>
  </CardContent>
</Card>
        </div>
    )
}