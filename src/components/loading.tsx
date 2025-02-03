"use client";

import Image from "next/image";
// import Lottie from "lottie-react";
// import LoadingAnimation from "~/public/animations/loading.lottie"; // You'll need to add your own animation JSON
import { CSSProperties } from "react";

const style: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  minHeight: "50vh",
};

export default function Loading() {
  return (
    <div style={style}>
      {/* <Lottie
        animationData={LoadingAnimation}
        loop={true}
        style={{ width: 200, height: 200 }} // Adjust size as needed
      /> */}
      <Image src={"/animations/loading.gif"} alt="" width={200} height={200} />
    </div>
  );
}
