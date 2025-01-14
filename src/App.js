import React, { useState } from "react";
import InfoStep from "./components/InfoStep";
import SelectPlansStep from "./components/SelectPlansStep";
import AddOnsStep from "./components/AddOnsStep";
import SummaryStep from "./components/SummaryStep";
import ThankYou from "./components/ThankYou";
const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [errors, setErrors] = useState({});

  const steps = ["Your Info", "Select Plan", "Add-Ons", "Summary"];

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const gotoPlanStep = () => {
    // NB: this can be modified to go back to any step by passing the step number
    setCurrentStep(2);
  };

  const handleUserInfoChange = (id, value) => {
    setUserInfo((prev) => ({ ...prev, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleNext = () => {
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    // setCurrentStep(currentStep + 1);
    if (currentStep === steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!userInfo.name.trim()) newErrors.name = "Name is required.";
        if (!userInfo.email.trim()) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
          newErrors.email = "Please enter a valid email address.";
        }
        if (!userInfo.phone.trim()) newErrors.phone = "Phone number is required.";
        break;
  
      case 2: 
        if (!selectedPlan) newErrors.plan = "Please select a plan.";
        break;
  
      case 3: 
        break; // No validation for this step because add ons are required
  
      case 4: 
        if (!userInfo.name || !userInfo.email || !userInfo.phone) {
          newErrors.summary = "User information is incomplete.";
        }
        if (!selectedPlan) {
          newErrors.summary = "Plan selection is missing.";
        }
        break;
  
      default:
        break;
    }
    return newErrors;
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <InfoStep
            handleNext={handleNext}
            userInfo={userInfo}
            errors={errors}
            handleUserInfoChange={handleUserInfoChange}
          />
        );
      case 2:
        return (
          <SelectPlansStep
            handleNext={handleNext}
            handleBack={handleBack}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            errors={errors}
          />
        );
      case 3:
        return (
          <AddOnsStep
            handleNext={handleNext}
            handleBack={handleBack}
            selectedAddOns={selectedAddOns}
            setSelectedAddOns={setSelectedAddOns}
          />
        );
      case 4:
        return (
          <SummaryStep
            handleBack={handleBack}
            handleNext={handleNext}
            selectedPlan={selectedPlan}
            billingCycle={billingCycle}
            selectedAddOns={selectedAddOns}
            gotoPlanStep={gotoPlanStep}
            errors={errors}
          />
        );
      case 5:
        return <ThankYou />;
      default:
        return null;
    }
  };

  // log everything
  console.log("Current Step:", currentStep);
  console.log("Selected Plan:", selectedPlan);
  console.log("Billing Cycle:", billingCycle);
  console.log("User Info:", userInfo);
  console.log("Selected Add-Ons:", selectedAddOns);


  return (
    <div className="md:min-h-screen md:flex justify-center items-center bg-cover bg-no-repeat bg-magnolia">
      {/* Mobile sidebar */}
      {window.innerWidth < 768 && (
        <div
          className="p-6 md:w-1/3 w-full md:rounded-lg flex-shrink-0 bg-mobile-sidebar"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(./assets/images/bg-sidebar-mobile.svg)",
            backgroundPosition: "top",
            backgroundSize: "cover",
            height: "200px",
          }}
        >
          <ul className="flex justify-center space-x-4">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`py-2 px-2 rounded-lg cursor-pointer transition-colors flex items-center flex-col ${
                  currentStep === index + 1 ? " text-white" : "text-white"
                }`}
              >
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border rounded-full ${
                    currentStep === index + 1
                      ? "bg-lightBlue text-black"
                      : "bg-transparent border-white"
                  }`}
                >
                  {index + 1}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="md:p-4 m-4 card flex flex-col md:flex-row bg-white rounded-lg shadow-md md:w-4/6 max-w-6xl" style={{ marginTop: "-100px" }}>
        {/* Desktop Sidebar */}
        {window.innerWidth >= 768 && (
          <div
            className={`p-6 md:w-1/3 w-full md:rounded-lg flex-shrink-0 bg-desktop-sidebar"`}
            style={{
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${"./assets/images/bg-sidebar-desktop.svg"})`,
            }}
          >
            <ul className="space-y-4">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`py-2 px-2 rounded-lg cursor-pointer transition-colors flex items-center space-x-4 ${
                    currentStep === index + 1 ? " text-white" : "text-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border rounded-full ${
                      currentStep === index + 1
                        ? "bg-lightBlue text-black"
                        : "bg-transparent border-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-sm md:text-base">
                    <div className="uppercase text-sm text-coolGray font-light">
                      Step {index + 1}
                    </div>
                    <div className="uppercase font-bold">{step}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Content */}
        <div
          className="w-full md:w-2/3 p-8 flex flex-col  "
          style={{ height: window.innerWidth < 768 ? "auto" : "575px" }}
        >
          <div className="flex-grow">{renderStepContent()}</div>
          {currentStep !== 5 && (

<div
className="flex justify-between fixed bottom-0 left-0 right-0 bg-white px-4 py-4 md:static md:p-8 md:pt-0"
>
              {currentStep > 1 && ( 
                <button
                  onClick={handleBack}
                  className="text-coolGray rounded-lg hover:text-blue-800 transition-colors"
                >
                  Go Back
                </button>
              )}
              <button
                onClick={handleNext}
                className={`py-3 px-6 rounded-lg transition-colors ml-auto ${
                  currentStep === steps.length
                    ? "bg-purplishBlue text-lightBlue hover:bg-pastelBlue"
                    : "bg-marineBlue text-lightBlue"
                }`}
              >
                {currentStep === steps.length ? "Confirm" : "Next Step"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
