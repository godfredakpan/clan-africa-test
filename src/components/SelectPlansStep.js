import React from "react";
import StepLayout from "./StepLayout";

const plans = [
  { id: 1, name: "Arcade", priceMonthly: 9, priceYearly: 90, image: "./assets/images/icon-arcade.svg", freeMonth: "2" },
  { id: 2, name: "Advanced", priceMonthly: 12, priceYearly: 120, image: "./assets/images/icon-advanced.svg", freeMonth: "2" },
  { id: 3, name: "Pro", priceMonthly: 15, priceYearly: 150, image: "./assets/images/icon-pro.svg", freeMonth: "2" },
];

const SelectPlansStep = ({
  handleBack,
  handleNext,
  selectedPlan,
  setSelectedPlan,
  billingCycle,
  setBillingCycle,
  errors,
}) => {
  const handleBillingCycleChange = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");
  };

  return (
    <StepLayout title="Select Your Plan" subtitle="You have the option of monthly or yearly billing." handleBack={handleBack} handleNext={handleNext}>
      {errors.plan && <p className="text-red-500 text-sm mb-4">{errors.plan}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
          key={plan.id}
          className={`border p-4 rounded-lg cursor-pointer transition-shadow hover:border-purplishBlue hover:shadow-lg ${
            selectedPlan?.id === plan.id ? "border-purplishBlue bg-alabaster" : "border-lightGray"
          }`}
          onClick={() => setSelectedPlan(plan)}
        >
          <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2">
            <img
              src={plan.image}
              alt={plan.name}
              className="w-10 h-10 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg text-marineBlue mt-0 sm:mt-10">{plan.name}</h3>
              <p className="text-coolGray">
                {billingCycle === "monthly"
                  ? `$${plan.priceMonthly}/mo`
                  : `$${plan.priceYearly}/yr`}
              </p>
              {billingCycle === "yearly" && (
                <p className="text-marineBlue mt-2">{plan.freeMonth} months free</p>
              )}
            </div>
          </div>
        </div>
        
        ))}
      </div>

      <div className="flex justify-center bg-alabaster py-4 rounded items-center mt-6  mb-10">
        <span className="mr-2 text-coolGray">Monthly</span>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={billingCycle === "yearly"} 
            onChange={handleBillingCycleChange}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-1 peer-focus:ring-marineBlue peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-marineBlue"></div>
        </label>
        <span className="ml-2 text-coolGray">Yearly</span>
      </div>
    </StepLayout>
  );
};

export default SelectPlansStep;
