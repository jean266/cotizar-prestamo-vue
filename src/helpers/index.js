
const calculateTotalPay = (amount, term) => {
    let total; 

    // Mientras mayor es la cantidad, menor es el interes
    if(amount < 5000000) {
        total = amount * 1.5;
    } else if (amount >= 5000000 && amount < 10000000) {
        total = amount * 1.4;
    } else if (amount >= 10000000 && amount < 15000000) {
        total = amount * 1.3;
    } else {
        total = amount * 1.2;
    }

    // Mientras mayor plazo, mayor interes
    if(+term === 6) {
        total *= 1.1;
    } else if (+term === 12) {
        total *= 1.2;
    } else {
        total *= 1.3;
    }

    return total;
}

export {
    calculateTotalPay
}