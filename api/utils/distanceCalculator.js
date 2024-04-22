function calculateDistance(pickUpLocationCity, dropOffLocationCity) {
    const cityPairs = [
        { cities: ["Manila", "Quezon City"], distance: 13 },
        { cities: ["Manila", "Pampanga City"], distance: 96 },
        { cities: ["Manila", "Batangas City"], distance: 102 },
        { cities: ["Manila", "Baguio City"], distance: 31 },
        { cities: ["Baguio City", "Batangas City"], distance: 120 },
        { cities: ["Baguio City", "Pampanga City"], distance: 77 },
        { cities: ["Baguio City", "Quezon City"], distance: 16 },
        { cities: ["Batangas City", "Pampanga City"], distance: 192 },
        { cities: ["Batangas City", "Quezon City"], distance: 119 },
        { cities: ["Quezon City", "Pampanga City"], distance: 80 }
    ];

    const pair = cityPairs.find(pair =>
        (pair.cities[0] === pickUpLocationCity && pair.cities[1] === dropOffLocationCity) ||
        (pair.cities[1] === pickUpLocationCity && pair.cities[0] === dropOffLocationCity)
    );

    return pair ? pair.distance : 0; // Return distance if pair is found, otherwise 0
}

module.exports = calculateDistance;
