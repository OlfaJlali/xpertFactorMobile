export const handleNumericInput = (text: string, setter: (value: number | null) => void) => {
    const numericValue = parseFloat(text);
    setter(isNaN(numericValue) ? null : numericValue);
  };