import { ThemeContext } from '@/context/ThemeContext';
import { X } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Input } from './ui/input';
import Image from 'next/image';
import { toast } from 'sonner';
import { AddPost } from '@/actions/memorials';
import { useAuth } from '@clerk/nextjs';

const FeedModal = () => {
  const { setFeed, selectedImage } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState(selectedImage || '');
  const [loading, setLoading] = useState(false);


  const publishPost = async () => {
    if (!title || !description) {
      toast.error('გთხოვ შეავსო სათაური და აღწერა');
      return;
    }

    setLoading(true);
    try {
      const res = await AddPost({ title, description, imgUrl });

      if (res.success) {
        toast.success('პოსტი წარმატებით აიტვირთა');
        setFeed(false);
      } else {
        toast.error('დაფიქსირდა შეცდომა');
      }
    } catch (err) {
      console.error(err);
      toast.error('დაფიქსირდა შეცდომა');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm">
  <div className="w-[95%] sm:w-[90%] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto bg-white opacity-95 rounded-xl shadow-2xl p-4 sm:p-8">
    <div className="flex justify-end">
      <X
        className="cursor-pointer text-gray-500 hover:text-red-500 transition-all duration-200"
        onClick={() => setFeed(false)}
      />
    </div>
  
  
    <div className="flex flex-col gap-4 sm:gap-6 mt-4">
     
      <Input
        type="text"
        placeholder="შეყვარებულის სახელი ან სურათის სათაური.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-base sm:text-lg py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      />
  
      
      <textarea
        placeholder="მესიჯი ან აღწერა..."
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="resize-none w-full border border-gray-300 rounded-md px-4 py-3 text-base shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      ></textarea>
  
   
      {imgUrl && (
        <Image
          src={imgUrl}
          alt="img"
          width={200}
          height={200}
          className="rounded-md shadow-lg cursor-pointer hover:opacity-80 mx-auto"
        />
      )}
  
     
      <button
        onClick={publishPost}
        className="bg-[#3A59D1] disabled:bg-gray-400 cursor-pointer hover:bg-yellow-500 text-white font-semibold py-2 rounded-md shadow-md transition duration-300"
        disabled={loading}
      >
        {loading ? 'იტვირთება...' : 'გამოქვეყნება'}
      </button>
    </div>
    </div>
  </div>
  
  );
};

export default FeedModal;
