export const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
export const isPasswordValid = (pwd: string): boolean => {
    return pwd.length >= 6 && /\d/.test(pwd); // At least 6 characters and contains a number
};
export const validateAmount = (amount: string) => {
    if (!amount) {
      return false;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return false; 
    }
    if (parsedAmount < 100 || parsedAmount > 1000000) { 
      return false; 
    }
    return true; 
};
  