// SavingsInputForm.jsx
import React, { useState } from 'react';

function SavingsInputForm({ onSubmit }) { // Prop name corrected to match the passed prop from the parent
  const [formData, setFormData] = useState({
    startingBalance: 25000,
    annualYield: 1.10,
    monthlyContribution: 100,
    yearsToSave: 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // This will call the function passed from the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="startingBalance"
        placeholder="Starting Balance"
        value={formData.startingBalance}
        onChange={handleChange}
      />
      <input
        type="number"
        name="annualYield"
        placeholder="Annual Yield (APY)"
        value={formData.annualYield}
        onChange={handleChange}
      />
      <input
        type="number"
        name="monthlyContribution"
        placeholder="Monthly Contribution"
        value={formData.monthlyContribution}
        onChange={handleChange}
      />
      <input
        type="number"
        name="yearsToSave"
        placeholder="Years to Save"
        value={formData.yearsToSave}
        onChange={handleChange}
      />
      <button type="submit">Calculate</button>
    </form>
  );
}

export default SavingsInputForm;
