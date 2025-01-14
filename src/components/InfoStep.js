import React from "react";
import StepLayout from "./StepLayout";

const InfoStep = ({ handleNext, userInfo, errors, handleUserInfoChange }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    handleUserInfoChange(id, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <StepLayout
      title="Personal info"
      subtitle="Please provide your name, email address, and phone number."
      handleNext={handleNext}
      isFirstStep={true}
    >
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-marineBlue" htmlFor="name">
              Name
            </label>
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>
          <input
            type="text"
            id="name"
            value={userInfo.name}
            onChange={handleChange}
            placeholder="e.g. Stephen King"
            className={`w-full border ${
              errors.name ? "border-red-600" : "border-lightGray"
            } rounded-lg p-3 text-marineBlue hover:border-purplishBlue`}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-marineBlue" htmlFor="email">
              Email Address
            </label>
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>
          <input
            type="email"
            id="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="e.g. stephenking@lorem.com"
            className={`w-full border ${
              errors.email ? "border-red-600" : "border-lightGray"
            } rounded-lg p-3 text-marineBlue hover:border-purplishBlue`}
          />
        </div>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <label className="block text-marineBlue" htmlFor="phone">
              Phone Number
            </label>
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>
          <input
            type="tel"
            id="phone"
            value={userInfo.phone}
            onChange={handleChange}
            placeholder="e.g. +1 234 567 890"
            className={`w-full border ${
              errors.phone ? "border-red-600" : "border-lightGray"
            } rounded-lg p-3 text-marineBlue hover:border-purplishBlue`}
          />
        </div>
      </form>
    </StepLayout>
  );
};

export default InfoStep;
