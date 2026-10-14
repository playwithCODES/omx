import React from "react";
import Image from "next/image";

function Banner() {
  return (
    <div className="w-full h-135 relative">
      <Image src="/images/banner.jpg"
       alt="Movie Banner"
       fill
       className="object-cover object-top"
       priority
         />
    </div>
  );
}

export default Banner;
