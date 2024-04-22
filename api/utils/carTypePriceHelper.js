function setBasePrice(carType){
    let basePricePerKm;
    basePricePerKm = (carType === 'Sedan') ? 1245 : 1632;

    return basePricePerKm
}

module.exports = setBasePrice