import React from "react";

const StepLayout = ({ title, subtitle, children }) => {
  return (
    <div className="md:p-8 md:pt-0 mb-6 h-full" >
      <h2 className="text-3xl font-bold mb-2 text-marineBlue">{title}</h2>
      <p className="mb-6 text-coolGray">{subtitle}</p>
      <div className="mb-6 text-coolGray">{children}</div>
    </div>
  );
};

export default StepLayout;
