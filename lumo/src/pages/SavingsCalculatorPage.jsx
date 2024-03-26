// SavingsCalculatorPage.jsx
import React, { useState } from 'react';
import SavingsInputForm from '../components/SaveNowVsLaterCalc/SavingsInputForm';
import SavingsGraph from '../components/SaveNowVsLaterCalc/SavingsGraph';
import { calculateSavings } from '../services/savingsCalculator';
// ... other imports if necessary

function SavingsCalculatorPage() {
  const [calculatedData, setCalculatedData] = useState(null);

  const handleFormSubmit = (formData) => {
    const result = calculateSavings(
      formData.startingBalance,
      formData.annualYield,
      formData.monthlyContribution,
      formData.yearsToSave
    );
    setCalculatedData(result);
  };

  // Check if calculatedData is not null before logging or passing it down
  if (calculatedData) {
    console.log(calculatedData.graphData);
  }

  return (
    <div>
      <SavingsInputForm onSubmit={handleFormSubmit} />
      {/* Only render SavingsGraph if calculatedData and calculatedData.graphData exist */}
      {calculatedData && calculatedData.graphData && (
        <SavingsGraph data={calculatedData.graphData} />
      )}
      {/* Implement other components as necessary */}
    </div>
  );
}

export default SavingsCalculatorPage;
