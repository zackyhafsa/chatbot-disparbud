"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

const Robot = () => {
  return (
    <Link href={"/chat"}>
      <DotLottieReact
        src="robot.lottie"
        autoplay
        loop
        className="fixed z-10 bottom-5 -right-10 w-60 max-lg:w-52 max-lg:bottom-0"
      />
    </Link>
  );
};

export default Robot;
