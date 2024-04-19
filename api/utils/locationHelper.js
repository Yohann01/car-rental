// locationHelper.js

function setLocation(city) {
    let location;

    switch (city) {
        case 'Manila':
            location = "Manila 2345 Makati Avenue, Makati City, Manila, Philippines";
            break;
        case 'Batangas City':
            location = "31 B.Luna, Poblacion, Batangas";
            break;
        case 'Quezon City':
            location = "4567 EDSA Avenue, Quezon City, Philippines";
            break;
        case 'Baguio City':
            location = "9876 Session Road, Baguio City, Philippines";
            break;
        case 'Pampanga City':
            location = "2000 Manila N Rd, Balibago, Angeles, Pampanga";
            break;
        default:
            location = "Unknown Location"; // Default location if city is not recognized
            break;
    }

    return location;
}

// Export the setLocation function to be used in other modules
module.exports = {
    setLocation
};
