const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  const formatCurrency = (number) => {
    const formattedNumber = CURRENCY_FORMATTER.format(number);
    return `${formattedNumber} L.E.`;
  };
  
  export default formatCurrency;
  