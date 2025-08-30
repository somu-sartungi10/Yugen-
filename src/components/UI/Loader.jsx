import { FadeLoader } from "react-spinners";
import React from "react";

const Loader = () => {
  return (
    <p className="flex items-center justify-center">
      <FadeLoader color="#82bceb" height={7} margin={3} />
    </p>
  );
};

export default Loader;
