import React from "react";
import StepLayout from "./StepLayout";

const SummaryStep = ({ handleBack, handleNext, selectedPlan, billingCycle, selectedAddOns, gotoPlanStep }) => {
  const calculateTotal = () => {
    let total = 0;

    switch (selectedPlan.name) {
      case "arcade":
        total += billingCycle === "monthly" ? 9 : 90;
        break;
      case "advanced":
        total += billingCycle === "monthly" ? 12 : 120;
        break;
      case "pro":
        total += billingCycle === "monthly" ? 15 : 150;
        break;
      default:
        break;
    }

    if (selectedAddOns.length > 0) {
      selectedAddOns.forEach((addOn) => {
        total += billingCycle === "monthly" ? addOn.priceMonthly : addOn.priceYearly;
      });
    }

    return total;
  };

  return (
    <StepLayout
      title="Finishing up"
      subtitle="Double-check everything looks OK before confirming."
      handleBack={handleBack}
      handleNext={handleNext}
      isLastStep={true}
    >
      <div className="bg-alabaster p-8 rounded-lg">
        <div className="rounded-lg mb-6 flex justify-between">
          <span className="font-bold text-marineBlue">
            {selectedPlan.name} {billingCycle === "yearly" ? "(Yearly)" : "(Monthly)"}
            <br />
            <button
              onClick={gotoPlanStep}
              className="text-coolGray text-sm underline hover:text-purplishBlue font-light"
            >
              Change
            </button>
          </span>
          <p className="text-marineBlue font-bold">
            {selectedPlan.name === "arcade"
              ? billingCycle === "monthly"
                ? `+ $9/mo`
                : `$90/yr`
              : selectedPlan.name === "advanced"
              ? billingCycle === "monthly"
                ? `+ $12/mo`
                : `$120/yr`
              : selectedPlan.name === "pro"
              ? billingCycle === "monthly"
                ? `+ $15/mo`
                : `$150/yr`
              : ""}
          </p>
        </div>


        {selectedAddOns && selectedAddOns.length > 0 ? (
          selectedAddOns.map((addOn) => (
            <div className="rounded-lg flex justify-between" key={addOn.id}>
              <h3 className="text-coolGray">{addOn.name}</h3>
              <p className="text-marineBlue">
                {billingCycle === "monthly"
                  ? `+ $${addOn.priceMonthly}/mo`
                  : `$${addOn.priceYearly}/yr`}
              </p>
            </div>
          ))
        ) : (
          <p className="text-coolGray">No add-ons selected</p>
        )}
      </div>


      <div className="p-8 rounded-lg mb-6 flex justify-between">
        <h3 className="text-coolGray">
          Total ({billingCycle === "yearly" ? "per year" : "per month"})
        </h3>
        <p className="text-purplishBlue font-bold text-lg">
          {billingCycle === "monthly"
            ? `+ $${calculateTotal()}/mo`
            : `$${calculateTotal()}/yr`}
        </p>
      </div>
    </StepLayout>
  );
};

export default SummaryStep;
