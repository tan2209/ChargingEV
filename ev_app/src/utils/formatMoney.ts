export const formatCurrency = (amount: number) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '0'; 
    }
    const parts = amount.toString().split('.');
    const digits = parts[0].split('').reverse();
    let formatted = '';
    let count = 0;

    for (let i = 0; i < digits.length; i++) {
        if (count === 3) {
            formatted += ',';
            count = 0;
        }
        formatted += digits[i];
        count++;
    }
    return formatted.split('').reverse().join('');
};