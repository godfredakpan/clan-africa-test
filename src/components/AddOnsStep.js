import React, { useState, useEffect } from "react";
import StepLayout from "./StepLayout";

const AddOnsStep = ({ handleNext, handleBack, selectedPlan, billingCycle, selectedAddOns, setSelectedAddOns }) => {
  const [addOns, setAddOns] = useState([
    { id: 1, name: "Online service", description: "Access to multiplayer games", priceMonthly: 1, priceYearly: 10, selected: true },
    { id: 2, name: "Larger storage", description: "Extra 11B or cloud save", priceMonthly: 2, priceYearly: 20, selected: false },
    { id: 3, name: "Customizable Profile", description: "Custom scheme on your profile", priceMonthly: 2, priceYearly: 20, selected: false },
  ]);

  useEffect(() => {
    setAddOns(prevAddOns =>
      prevAddOns.map(addOn => ({
        ...addOn,
        selected: selectedAddOns.some(item => item.id === addOn.id),
      }))
    );
  }, [selectedAddOns]);


  const handleCheckboxChange = (id) => {
    setAddOns((prevAddOns) => {
      const updatedAddOns = prevAddOns.map((addOn) =>
        addOn.id === id ? { ...addOn, selected: !addOn.selected } : addOn
      );
      setSelectedAddOns(updatedAddOns.filter((addOn) => addOn.selected));
      return updatedAddOns;
    });
  };

  return (
    <StepLayout title="Pick add-Ons" subtitle="Select additional features." handleBack={handleBack} handleNext={handleNext}>
      <div className="mb-6">
        {addOns.map((addOn) => (
          <div
            key={addOn.id}
            className={`p-4 border border-lightGray rounded-lg mb-4 hover:border-purplishBlue cursor-pointer flex items-center ${
              addOn.selected ? "border-purplishBlue" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={addOn.selected}
              onChange={() => handleCheckboxChange(addOn.id)}
              className="mr-5 w-5 h-5 text-purplishBlue bg-gray-100 border-gray-300 rounded focus:ring-purplishBlue peer"
            />
            
            <div className="flex-grow">
              <h3 className="font-bold text-marineBlue">{addOn.name}</h3>
              <p className="text-coolGray">{addOn.description}</p>
            </div>
            
            <p className="text-purplishBlue">
              {billingCycle === "monthly"
                ? `+$${addOn.priceMonthly}/mo`
                : `+$${addOn.priceYearly}/yr`}
            </p>
          </div>
        ))}
      </div>
    </StepLayout>
  );
};

export default AddOnsStep;
