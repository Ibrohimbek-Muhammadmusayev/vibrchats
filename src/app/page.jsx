'use client';

import Picker from '@emoji-mart/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  LogOut,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [usersdata, setUsersdata] = useState([]);
  const [usermessagedata, setUsermessagedata] = useState([]);
  const [userdataildata, setUserdataildata] = useState([]);
  const [token, setToken] = useState(null); // Tokenni saqlash uchun useState

  const datas = { 
    name: 'ibrohimbek',
    familiya: 'muhammadmusayev',
  };
  const ofshi = datas.name[0] + datas.familiya[0];

  const addEmogi = (e) => {
    const sum = e.unified.split('_');
    const codeArray = sum.map((element) => `0x${element}`);
    const emoji = String.fromCodePoint(...codeArray);
    setText(text + emoji);
  };
  
  useEffect(() => {
    const storedToken = JSON.parse(window.localStorage.getItem('token'));
    setToken(storedToken);
  }, []); // Tokenni komponent yuklanishi bilan olish

  useEffect(() => {
    if (token) {
      const getusersdata = async () => {
        const querySnapshot = await getDocs(collection(db, token.uid));
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setUsersdata(users);
      };
      getusersdata();
    }
  }, [token]); // Token yangilanganda usersdata-ni yangilash

  const onChat = (data) => {
    const chatvalue = data.messages;
    setUsermessagedata(chatvalue);
    setUserdataildata(data);
  };

  if (!token) {
    router.push('/login');
    return null; // Agar token mavjud bo'lmasa, sahifa render bo'lmasin
  }

  if (!token) {
    router.push('/login');
    return null; // Prevent rendering the rest of the component if not authenticated
  }

  return (
    <div 
      style={{ backgroundImage: `url("https://get.wallhere.com/photo/nature-sunrise-blue-valley-wilderness-Alps-summit-plateau-ridge-cloud-mountain-dawn-1920x1080-px-atmospheric-phenomenon-mountainous-landforms-landform-geographical-feature-mountain-range-625072.jpg")` }} 
      className="w-full h-screen bg-cover flex"
    >
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel className="backdrop-blur-sm shadow-2xl" defaultSize={20} minSize={15} maxSize={35}>
          <div className="flex">
            <div className="w-[70px] h-full border-r bg-[#d6e6ff66] rounded-r-[8px] flex">
              <div className="flex flex-col pt-[15px] pb-[15px] h-full mx-auto items-center my-auto justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>{ofshi}</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>New group</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Invite users</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex flex-col gap-[20px]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="max-w-[70px] h-[50px] m-0 hover:bg-[#7370702e] bg-[#efe9e92e] text-black">
                          <Image
                            src="https://cdn.onlinewebfonts.com/svg/img_508630.png"
                            width={40}
                            height={40}
                            alt="settings logo"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Users</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="max-w-[70px] h-[50px] m-0 hover:bg-[#7370702e] bg-[#efe9e92e] text-black">
                          <Image
                            src="https://cdn4.iconfinder.com/data/icons/silky-icon-user/60/users1-1024.png"
                            width={40}
                            height={40}
                            alt="settings logo"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Groups</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="max-w-[70px] h-[50px] m-0 hover:bg-[#7370702e] bg-[#efe9e92e] text-black">
                          <Image
                            src="/contact.svg"
                            width={40}
                            height={40}
                            alt="contacts logo"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Contacts</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="max-w-[70px] rounded-full h-[50px] m-0 hover:bg-[#7370702e] bg-[#efe9e92e] text-black">
                        <Settings className="h-[30px] w-[30px]" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="mx-auto w-full">
              <div className="w-full p-4 border-b">
                <input 
                  className="w-full pl-[15px] h-[30px] outline-none rounded-[20px] mx-auto" 
                  type="text" 
                  placeholder="search" 
                />
              </div>
              <div className="flex flex-col pt-[20px]">
                {usersdata.map((data) => (
                  <div 
                    key={data.uid} 
                    onClick={() => onChat(data)} 
                    className="cursor-pointer flex font-semibold px-[10px] border-y h-[60px] w-full bg-white"
                  >
                    <div className="flex items-center gap-[10px]">
                      <Avatar>
                        <AvatarImage src={data.photoURL} alt={data.name} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h1 className="text-[20px]">{data.displayName}</h1>
                        <p className="text-[12px]">chats {data.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="#">
                  <div className="flex font-semibold px-[10px] border-y h-[60px] w-full bg-white">
                    <div className="flex items-center gap-[10px]">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <h1 className="text-[20px]">users</h1>
                        <p className="text-[12px]">chas 19:25</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel className="backdrop-blur-sm shadow-2xl" defaultSize={7} minSize={5} maxSize={13}>
              {userdataildata && Object.keys(userdataildata).length > 0 ? (
                <div key={userdataildata.uid} className="flex h-full items-center justify-between p-6">
                  <div className="">
                    <Avatar className="w-[60px] h-[60px]">
                      <AvatarImage src={userdataildata.photoURL} alt={userdataildata.displayName} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="">
                    <h1 className="text-[20px]">{userdataildata.displayName}</h1>
                    <p className="text-[12px]">chats {userdataildata.time}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-between p-6">
                  <div className=""></div>
                  <div className=""></div>
                </div>
              )}
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="p-[20px] h-full w-full flex justify-between flex-col">
                <div className="font-semibold">
                  {usermessagedata.map((message) => (
                    <div className='p-[5px] rounded-[8px] text-white bg-gradient-to-r from-sky-500 to-indigo-500' key={message.id}>
                      <h1 className='text-white'>{message.message}</h1>
                      <p className='text-right text-[12px] font-normal text-pink-50'>{message.time}</p>
                    </div>
                  ))}
                </div>
                <div className="w-full">
                  <div className="flex bg-white rounded-[8px] px-[10px] h-[50px] items-center">
                    <input className="w-[30px] z-10 h-[30px] opacity-0" type='file'/>
                    <div className="absolute cursor-pointer">
                      <Image
                        className="top-[3px] cursor-pointer left-[5px]" 
                        src="/link.svg" 
                        width={30} 
                        height={30} 
                        alt="emoji" 
                      />
                    </div>
                    <input 
                      value={text} 
                      onChange={(e) => setText(e.target.value)} 
                      className="w-full pl-[15px] h-[30px] outline-none rounded-[20px] mx-auto" 
                      type="text" 
                      placeholder="Write a topic" 
                    />
                    <button>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <button>
                            <Image 
                              src="/emogi-logo.svg" 
                              width={30} 
                              height={30} 
                              alt="emoji" 
                            />
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-[385px]">
                          <Picker onEmojiSelect={addEmogi}/>
                        </HoverCardContent>
                      </HoverCard>
                    </button>
                    <button>
                      <Image 
                        src="/mic.svg" 
                        width={30} 
                        height={30} 
                        alt="mic" 
                      />
                    </button>
                    <button>
                      <Image 
                        src="/send.svg" 
                        width={30} 
                        height={30} 
                        alt="send" 
                      />
                    </button>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
