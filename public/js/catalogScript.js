document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('filter'); // Assuming 'filter' is the ID of your form
    const checkbxSUV = document.getElementById('suvCheckbox');
    const checkbxSedan = document.getElementById('sedanCheckbox');
// Get the current URL from the browser's address bar
    const currentUrl = window.location.href;
    // Parse the URL to extract query parameters
    const url = new URL(currentUrl);
    const queryParams = url.searchParams;

    // Extract specific parameters
    const pickUpLocationCity = queryParams.get('pickUpLocationCity');
    const dropOffLocationCity = queryParams.get('dropOffLocationCity');
    const pickUpDate = queryParams.get('pickUpDate');
    const dropOffDate = queryParams.get('dropOffDate');

    // console.log('Pickup Location City:', pickUpLocationCity);
    // console.log('Drop-off Location City:', dropOffLocationCity);
    // console.log('Pickup Date:', pickUpDate);
    // console.log('Drop-off Date:', dropOffDate);

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Construct the new URLSearchParams object
        const newUrl = new URLSearchParams();

        if (checkbxSUV.checked && checkbxSedan.checked) {
            newUrl.append('carType', 'SUV');
            newUrl.append('carType', 'Sedan');
        } else if (checkbxSUV.checked) {
            newUrl.append('carType', 'SUV');
        } else if (checkbxSedan.checked) {
            newUrl.append('carType', 'Sedan');
        }
        // Add other parameters to the URLSearchParams
        newUrl.set('pickUpDate', pickUpDate);
        newUrl.set('pickUpLocationCity',  pickUpLocationCity);
        newUrl.set('dropOffDate', dropOffDate);
        newUrl.set('dropOffLocationCity', dropOffLocationCity);

        // Redirect to the new URL with the parameters
        const baseUrl = '/catalog/cars';
        window.location.href = `${baseUrl}?${newUrl.toString()}`;
    });

   
});
