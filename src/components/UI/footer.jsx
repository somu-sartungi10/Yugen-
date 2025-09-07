import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="flex h-20  w-full justify-center items-center">
        <div className="text-primary/40">
          @ {year} Yugen. All right reserved
        </div>
    </footer>
  );
};

export default Footer;
