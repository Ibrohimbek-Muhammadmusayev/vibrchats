'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { auth } from '@/firebase';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [logindata, setLogindata] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    if (logindata.email.length !== 0 && logindata.password.length !== 0) {
      signInWithEmailAndPassword(auth, logindata.email, logindata.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          setError(false);
          // Use useEffect to handle side effects properly
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('token', JSON.stringify(user));
          }
          router.push('/');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          setError(true);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] relative flex flex-col items-center justify-center">
      {/* Check if window is defined before rendering the video */}
      {typeof window !== 'undefined' && (
        <video className="w-full h-full object-cover" src="https://firebasestorage.googleapis.com/v0/b/vibrchat.appspot.com/o/video_2024-07-28_18-26-05.mp4?alt=media&token=911b193b-cfb5-42f4-bc93-21945d188ebe" muted loop autoPlay></video>
      )}
      <div className="w-full absolute px-[10px]">
        <div className="max-w-[500px] border center min-h-[700px] rounded-[20px] backdrop-blur-xl flex flex-col justify-center mx-auto">
          <div className="flex flex-col px-[80px] gap-[50px] justify-center items-center">
            <div className="flex flex-col text-center">
              <h1 className="text-[30px] text-white">Vibrchatga xush kelibsiz</h1>
            </div>
            <form className="mt-[30px] w-full flex flex-col gap-[10px]" onSubmit={onSignup}>
              <div className="h-[20px] text-wrap text-center">
                {error === true ? <p className='text-red-600'>Please enter your email and password!</p> : null}
              </div>
              <div className="">
                {loading === true ? 
                  <div className="flex flex-col gap-[10px] mb-[20px]">
                    <Input disabled className="outline-none bg-transparent" placeholder={'Email'} type="email" />
                    <Input disabled className="outline-none bg-transparent" placeholder={'Password'} type="password" />
                  </div>
                :
                  <div className="flex flex-col gap-[10px] mb-[20px]">
                    <Input onChange={(e) => setLogindata({ ...logindata, email: e.target.value })} className="outline-none bg-transparent" placeholder={'Email'} type="email" />
                    <Input onChange={(e) => setLogindata({ ...logindata, password: e.target.value })} className="outline-none bg-transparent" placeholder={'Password'} type="password" />
                  </div>
                }
              </div>
              <div className="flex justify-between">
                <div className=""></div>
                <Link className='text-gray-200 hover:text-gray-400 transition-all' href={'/register'}>Create Account</Link>
              </div>
              {loading === true ? 
                <div className="w-full flex flex-col gap-[10px]">
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signin
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
                <Button type="submit" className="">Login</Button>
                <Button type="button" className="bg-slate-400 flex gap-[10px]">
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
