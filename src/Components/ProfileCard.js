"use client"
import { CircleUser, MoveLeft } from "lucide-react";
import Image from "next/image";
import { MOVIES_ROUTE } from "@/Constants/routes";
import { useRouter } from "next/navigation";

function ProfileCard() {
    const router=useRouter();
  return (
    <main className="max-w-7xl mx-auto px-4 mt-5">
      <section className='flex gap-5'>
        {/* for profile card */}
        <div className=" bg-black rounded-xl  px-4 flex flex-col h-auto w-60 items-center justify-center py-6 ml-15">
          <div className="flex flex-col items-center justify-center ">
            <CircleUser className="h-10 w-10 text-primary-500 mb-2" />
            <h1 className="text-white">Om Prakash Rajbanshi</h1>
            <span className="text-sm text-gray-500">
              omprakashrajbanshi627@gmail.com
            </span>
            <span className="text-sm text-gray-500">+977 9804028181</span>
            

          </div>
        <hr className="w-full border-t border-gray-500 my-4" />
          

          <div className="flex flex-col text-gray-500">

            <div className="flex justify-between">
              <span>Total bookings</span>
              <span className="text-white">3</span>
            </div>

            <div className="text-sm flex">
              <div  className="flex justify-between gap-15">
                <span>Total spent</span>
                <span className="text-white">Rs 3252</span>
              </div>
            </div>

            <div>
                <button className="text-sm  border mx-auto my-5  border-gray-400 rounded-xl py-2 px-15">Edit Profile</button>

            </div>
          </div>
        </div>

        {/* for movie history */}
        <div className=' flex flex-col '>
            <div className="flex gap-2">
                <button className="bg-primary-500 border rounded-md text-black py-1 px-2">Upcoming(1)</button>
                <button className="text-white  rounded-md py-1 px-2">History(2)</button>
            </div>

            {/* for upcoming movies and history */}

            <div className="border border-gray-700 rounded-xl mt-5 bg-black text-gray-500 p-5 w-auto">
                
                {/* for top part */}
                <div className="flex">
                    <Image 
                    src="/images/Interstellar.jpg"
                    alt="Movie Image"
                    width={70}
                    height={10}
                    className="rounded-xl"
                    />
                    <div className="flex flex-col ml-5 text-gray-500 text-sm">
                        <span className="text-white mb-2 text-lg">Intersellar:Redux</span>
                        <span>OMX Kathmandu Hall-3 --IMAX</span>
                        <span>Sept 23, 2026 8:15pm</span>
                        <span>Seats C4,C5</span>

                    </div>
                    <button className="ml-120 h-7 text-sm rounded-xl bg-green-950 text-primary-500 border border-primary-500 px-2 ">Upcoming</button>
                </div>
                <hr className="w-full border-t border-gray-500 my-4" />


                {/* for lower part */}
                <div className="flex text-sm">
                    <div className="">
                        <span>OMX4A2BF1</span>
                        <span className="ml-3 text-white">Rs 1068</span>
                    </div>
                    <button className="border py-1  px-2 rounded-xl ml-155 text-white">View Ticket</button>
                </div>
            </div>
        </div>


      </section>

      {/* for movie routing path */}
      <section>
        <button className="flex justify-center items-center ml-130 mt-20 text-primary-500 gap-1" onClick={()=> router.push(MOVIES_ROUTE)}>
            <MoveLeft className="" />
             Browse Movies
        </button>
      </section>
    </main>
  );
}

export default ProfileCard;
