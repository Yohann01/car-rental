document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('filter'); // Assuming 'filter' is the ID of your form
    const checkbxSUV = document.getElementById('suvCheckbox');
    const checkbxSedan = document.getElementById('sedanCheckbox');
    const checkbxAc = document.getElementById('acCheckbox')
    const CheckbxTransmission = document.getElementById('transmissionCheckbox')


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

    //Price formatting adding commas and '₱'
    const formattedPriceSpans = document.querySelectorAll('#formattedPrice');

    formattedPriceSpans.forEach(function(span) {
        const priceValue = parseInt(span.textContent);
        if (!isNaN(priceValue)) {
            span.textContent = '₱' + priceValue.toLocaleString();
        }
    });
    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Construct the new URLSearchParams object
        const newUrl = new URLSearchParams();



        // Add other parameters to the URLSearchParams
        newUrl.set('pickUpDate', pickUpDate);
        newUrl.set('pickUpLocationCity',  pickUpLocationCity);
        newUrl.set('dropOffDate', dropOffDate);
        newUrl.set('dropOffLocationCity', dropOffLocationCity);

        if (checkbxSUV.checked && checkbxSedan.checked) {
            newUrl.append('carType', 'SUV');
            newUrl.append('carType', 'Sedan');
        } else if (checkbxSUV.checked) {
            newUrl.append('carType', 'SUV');
        } else if (checkbxSedan.checked) {
            newUrl.append('carType', 'Sedan');
        } 

        if (checkbxAc.checked && CheckbxTransmission.checked) {
            newUrl.append('ac', 'true');
            newUrl.append('transmission', 'A');
        } else if (CheckbxTransmission.checked) {
            newUrl.append('ac', 'false');
            newUrl.append('transmission', 'A');
        } else if (checkbxAc.checked) {
            newUrl.append('ac', 'true');
            newUrl.append('transmission', 'M');
        }else{
            newUrl.append('ac', 'false');   
            newUrl.append('transmission', 'M');
        }

        // Redirect to the new URL with the parameters
        const baseUrl = '/catalog/cars';
        console.log(baseUrl);
        window.location.href = `${baseUrl}?${newUrl.toString()}`;
    });
    
    function overflow() {
        if (searchList.clientWidth < 902) {
            rightArrowContainer.classList.add('active');
        } else {
            rightArrowContainer.classList.remove('active')
        }
    }
    overflow();

});
const rightArrow = document.querySelector(".scrollable-search-container .right-arrow svg")
const leftArrow = document.querySelector(".scrollable-search-container .left-arrow svg")
const searchList = document.querySelector(".scrollable-search")
const leftArrowContainer = document.querySelector(".scrollable-search-container .left-arrow")
const rightArrowContainer = document.querySelector(".scrollable-search-container .right-arrow")



const manageIcons = () => {
    if(searchList.scrollLeft >= 20){
        leftArrowContainer.classList.add("active");
    }else{
        leftArrowContainer.classList.remove("active");
    }

    let maxScrollValue = searchList.scrollWidth - searchList.clientWidth - 20;
    console.log("Scrollwidth: ",searchList.scrollWidth);
    console.log("Clientwidth: ",searchList.clientWidth);
    if(searchList.scrollLeft >= maxScrollValue){
        rightArrowContainer.classList.remove('active')
    }else{
        rightArrowContainer.classList.add('active');
    }
}

rightArrow.addEventListener('click',() =>{
    searchList.scrollLeft += 500;
    manageIcons();
})
leftArrow.addEventListener('click',() =>{
    searchList.scrollLeft -= 500;
    manageIcons();
})

searchList.addEventListener('scroll', manageIcons);

