"use client"

import { toast } from "sonner";
import { z } from "zod"



export default function MemorialForm () {

    const [imageError, setImageError] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadedAiImage, setUploadedAiImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    
    const memorialSchema = z.object({
        fullName: z.string().min(1, "სახელის შევსება აუცილებელია"), 
        birthDate: z.union([z.string().datetime().optional(), z.null()]),
        deathDate: z.union([z.string().datetime().optional(), z.null()]),
        biography: z.string().optional(),
        images: z.array(z.string().url()).min(1, "სურათი სავალდებულოა"), 
        funeralPlace: z.string().optional(),
        funeralDate: z.union([z.string().datetime().optional(), z.null()]),
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
                    `Successfully uploaded ${validFiles.length} images`
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
        

    return (
        <div>
            memorial form
        </div>
    )
}