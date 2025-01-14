import React from "react";
import StepLayout from "./StepLayout";

const ThankYou = ({ handleBack, handleNext }) => {
  return (
    <StepLayout
      title=""
      handleBack={handleBack}
      handleNext={handleNext}
      isLastStep={true}
    >
      <div className="flex flex-col items-center justify-center h-full text-center" style={{marginTop: '100px'}}>
        <img src="./assets/images/icon-thank-you.svg" alt="Thank You" className="mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-2 text-marineBlue">Thank you!</h2>
        <p className="mb-6 text-coolGray">
          Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
        </p>
      </div>
    </StepLayout>
  );
};

export default ThankYou;
