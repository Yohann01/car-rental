 // Client-side JavaScript to format the price with commas
 document.addEventListener('DOMContentLoaded', function() {
    const formattedPriceElement = document.getElementById('total');
    const formattedinitialPriceElement = document.getElementById('total-initial');
    const formatpayOnlineElement = document.getElementById('pay-online');
    const discount = 2581.64;


    let priceValue = formattedPriceElement.textContent.trim();
    const formattedPrice = numberWithCommas(parseFloat(priceValue));
    formattedPriceElement.textContent = 'PHP ' + formattedPrice;
    
    
    const initialPrice = formattedinitialPriceElement.textContent.trim();
    console.log(initialPrice);
    const formattedInitialPrice = numberWithCommas(parseFloat(initialPrice));
    formattedinitialPriceElement.textContent = 'PHP ' + formattedInitialPrice;
    formatpayOnlineElement.textContent = 'PHP ' + formattedInitialPrice;

    const checkboxElement = document.getElementById('terms-condition');
    const submitButton = document.getElementById('submit-button');
// Initially disable the button
    submitButton.disabled = true;

    // Add event listener to the checkbox
    checkboxElement.addEventListener('change', function() {
        // Enable/disable the button based on the checkbox status
        submitButton.disabled = !this.checked;
    });

    
});

// Function to add commas to a number
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
