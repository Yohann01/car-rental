
// Function to construct the updated URL based on checkbox states
// function updateUrlWithFilters() {
//     const params = new URLSearchParams(window.location.search);
//     const suvChecked = document.getElementById('suvCheckbox').checked;
//     const sedanChecked = document.getElementById('sedanCheckbox').checked;
    
//     Update carType parameter based on checkbox states
//     params.set('carType', suvChecked ? 'SUV' : '');
//     params.set('carType', sedanChecked ? 'Sedan' : '');

//     Construct the new URL with updated parameters
//     const updatedUrl = `/catalog/cars?${params.toString()}`;
//     console.log(updatedUrl);
//     Update the browser URL without reloading the page
//     window.history.replaceState({}, '', updatedUrl);

//     Optionally, you can make an AJAX request here to update server-side data
//     Example: fetch(`/update-query${params.toString()}`);
// }

// Event listeners for checkbox changes
// document.getElementById('suvCheckbox').addEventListener('change', updateUrlWithFilters);
// document.getElementById('sedanCheckbox').addEventListener('change', updateUrlWithFilters);

// Call the function initially to set the URL based on default checkbox states
// updateUrlWithFilters();
