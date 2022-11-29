import React from "react";
import Lottie from "react-lottie";

import comingSoon from "@/lotties/coming-soon";

const ComingSoon = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: comingSoon,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      style={{
        width: "60%",
        height: "auto",
        marginTop: "6rem",
      }}
    />
  );
};

export default ComingSoon;
