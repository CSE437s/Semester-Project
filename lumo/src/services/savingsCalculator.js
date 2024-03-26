// services/savingsCalculator.js
export const calculateSavings = (startingBalance, annualYield, monthlyContribution, yearsToSave) => {
  const monthlyRate = annualYield / 100 / 12;
  let currentBalance = startingBalance;
  const dataPoints = [];
  
  for (let month = 1; month <= yearsToSave * 12; month++) {
    currentBalance += currentBalance * monthlyRate + monthlyContribution;
    // Record balance at the end of each year
    if (month % 12 === 0) {
      dataPoints.push({
        year: new Date().getFullYear() + month / 12,
        value: currentBalance,
      });
    }
  }
  
  const finalBalance = currentBalance.toFixed(2);
  return {
    finalBalance: finalBalance,
    graphData: dataPoints,
  };
};
