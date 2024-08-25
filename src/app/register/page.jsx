'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import 'react-phone-input-2/lib/style.css'
import { auth, db } from '@/firebase';
import Link from 'next/link'
import Image from 'next/image'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { notification } from 'antd';
import PhoneInput from 'react-phone-input-2'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function Register() {
  const router = useRouter();
  const [signupdata, setSignupdata] = useState({
    email: '',
    password: '',
    name: '',
    familiya: '',
    phoneNumber: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userimg, setUserimg] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const onSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!signupdata.email || !signupdata.password || !signupdata.name || !signupdata.familiya || !userimg || !signupdata.phoneNumber) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `userAvatarimages/${signupdata.email}`);
      await uploadBytes(storageRef, userimg);
      const url = await getDownloadURL(storageRef);

      await createUserWithEmailAndPassword(auth, signupdata.email, signupdata.password);
      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: signupdata.name,
        photoURL: url,
        phoneNumber: signupdata.phoneNumber
      });

      // Checking if window is defined before using localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', JSON.stringify(user));
      }

      await adduserdata(user, url);
      setLoading(false);
      setError(false);
      router.push('/');
    } catch (error) {
      const errorMessage = error.message;
      api.error({
        message: errorMessage,
      });
      setError(true);
      setLoading(false);
    }
  };

  const adduserdata = async (user, image) => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName,
        uid: user.uid,
        firsname: signupdata.familiya,
        email: user.email,
        phoneNumber: signupdata.phoneNumber,
        photoURL: image,
        time: new Date().toLocaleString(),
      });

      await addDoc(collection(db, user.uid), {
        displayName: "Vibrchat",
        uid: `${Math.random() * 1000000}`,
        firsname: "chat",
        email: '',
        phoneNumber: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/chat-f162d.appspot.com/o/logos.svg?alt=media&token=abef18dd-cac0-4692-987f-f42c8e2c0ba9',
        time: new Date().toLocaleString(),
        messages: [{
          id: `${Math.random() * 1000000}`,
          message: `Assalomu alaykum Vibrchatga xush kelibsiz ${signupdata.name}`,
          time: new Date().toLocaleString(),
        }],
        time: new Date().toLocaleString(),
      });
    }
  };

  return (
    <div className="w-full h-[100vh] relative flex flex-col items-center justify-center">
      {contextHolder}
      {/* Check if window is defined before rendering the video */}
      {typeof window !== 'undefined' && (
        <video className="w-full h-full object-cover" src="https://firebasestorage.googleapis.com/v0/b/vibrchat.appspot.com/o/video_2024-07-28_18-26-05.mp4?alt=media&token=911b193b-cfb5-42f4-bc93-21945d188ebe" muted loop autoPlay></video>
      )}
      <div className="w-full absolute px-[10px]">
        <div id='recaptcha-container' className="max-w-[500px] border center min-h-[700px] rounded-[20px] backdrop-blur-xl flex flex-col justify-center mx-auto">
          <div className="flex flex-col px-[80px] gap-[30px] justify-center items-center">
            <div className="flex flex-col text-center">
              <h1 className="text-[30px] text-white">Vibrchatga xush kelibsiz</h1>
            </div>
            <form className="mt-[30px] w-full flex flex-col gap-[10px]" onSubmit={onSignup}>
              <div className="h-[20px] text-wrap text-center">
                {error && <p className='text-red-600'>Please fill in the form!</p>}
              </div>
              <div className="">
                {loading ?
                  <div className="flex flex-col gap-[10px] mb-[20px]">
                    <Input disabled className="outline-none bg-transparent" type="email" />
                    <Input disabled className="outline-none bg-transparent" type="Password" />
                    <Input disabled className="outline-none bg-transparent" type="text" />
                    <Input disabled className="outline-none bg-transparent" type="text" />
                    <PhoneInput disabled value={signupdata.phoneNumber} country={'uz'} className="w-full mx-auto bg-transparent" placeholder={'your last name'} type="number" />
                    <Input disabled className="outline-none bg-transparent" type="file" />
                  </div>
                  :
                  <div className="flex w-full flex-col gap-[10px] mb-[20px]">
                    <Input onChange={(e) => setSignupdata({ ...signupdata, email: e.target.value })} className="outline-none bg-transparent" placeholder={'Email'} type="email" />
                    <Input onChange={(e) => setSignupdata({ ...signupdata, password: e.target.value })} className="outline-none bg-transparent" placeholder={'Password'} type="Password" />
                    <Input onChange={(e) => setSignupdata({ ...signupdata, name: e.target.value })} className="outline-none bg-transparent" placeholder={'your name'} type="text" />
                    <Input onChange={(e) => setSignupdata({ ...signupdata, familiya: e.target.value })} className="outline-none bg-transparent" placeholder={'your last name'} type="text" />
                    <div className="w-full">
                      <PhoneInput value={signupdata.phoneNumber} country={'uz'} onChange={(number) => setSignupdata({ ...signupdata, phoneNumber: number })} className="bg-transparent" placeholder={'your last name'} type="number" />
                    </div>
                    <Input onChange={(e) => setUserimg(e.target.files[0])} className="outline-none bg-transparent" placeholder={'User Images'} type="file" />
                  </div>
                }
              </div>
              <div className="flex justify-between">
                <div className=""></div>
                <Link className='text-white hover:text-gray-400 transition-all' href={'/login'}>Login</Link>
              </div>
              {loading ?
                <div className="w-full flex flex-col gap-[10px]">
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signup
                  </Button>
                  <Button disabled type="submit" className="bg-slate-400 flex gap-[10px]">
                    <Image
                      src="/google-icon.svg"
                      alt="google-logo"
                      width={20}
                      height={20}
                    />
                    Google
                  </Button>
                </div>
                :
                <div className="w-full flex flex-col gap-[10px]">
                  <Button type="submit" className="">Signup</Button>
                  <Button type="submit" className="bg-slate-400 flex gap-[10px]">
                    <Image
                      src="/google-icon.svg"
                      alt="google-logo"
                      width={20}
                      height={20}
                    />
                    Google
                  </Button>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
