const dropOffDateElement = document.getElementById('drop-off-date');
    const pickUpDateElement = document.getElementById('pick-up-date');
    const dropOffLocElement = document.getElementById('drop-off-loc');
    const pickUpLocElement = document.getElementById('pick-up-loc');
    const checkboxElement = document.getElementById('terms-condition')
    const dropOffDate = dropOffDateElement.textContent;
    const pickUpDate = pickUpDateElement.textContent;
    const dropOffLoc = dropOffLocElement.textContent;
    const pickUpLoc = pickUpLocElement.textContent;
    const elements = stripe.elements();
    const cardElement = elements.create('card', {
        style: {
            base: {
            fontWeight: '500',
            fontSize: '12px',
            fontSmoothing: 'antialiased',
            
            ':-webkit-autofill': {
                color: '#fce883',
            },
            },
        },
        });
    cardElement.mount('#card-element');
    const carId = document.getElementById('car-id').value;
    // Now you can use the carId variable in your script
    console.log('Car ID:', carId);
    
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async function(event) {
    const checkboxElement = document.getElementById('terms-condition');
    checkboxElement.checked = false;
    const submitButton = document.getElementById('submit-button');
    // Initially disable the button
        submitButton.disabled = true;

    event.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (!nameInput.value || !emailInput.value) {
        requiredFields();
        }

    // Create a payment method using the card details entered by the user
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: name,
        email: email,
      }
    });

    if (error) {
      // Display error message to the user
      const displayError = document.getElementById('card-errors');
      displayError.textContent = error.message;
      requiredFields();
    } else {
      // Payment method created successfully
      console.log('Payment Method:', paymentMethod);
        loading()
      // Now you can submit the form to your server to complete the payment
      // For demonstration, you can use fetch() to send the payment method ID to your server
      // Replace 'YOUR_SERVER_ENDPOINT' with your actual server endpoint URL
      const response = await fetch('/api/auth/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            paymentMethodId: paymentMethod.id, 
            paymentMethod:paymentMethod.card.funding,
            carId: carId, 
            name: name, 
            email: email,
            pickUpDate: pickUpDate,
            dropOffDate: dropOffDate,
            pickUpLoc: pickUpLoc,
            dropOffLoc: dropOffLoc,
        }),
      });

      // Handle server response (e.g., show success message to the user)
      const result = await response.json();
      console.log('Server Response:', result);
      success();
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';

      // Clear card input field
      cardElement.clear();

    }
  });

  function requiredFields(){
    Swal.fire({
         icon: "warning",
         title: "Oops...",
         text: "Fill out all required fields",
         timer: 1200,
         showConfirmButton: false,
         });
  }
  function loading(){
    Swal.fire({
        timer: 1500,
        text:"Processing payment, please wait...",
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        }
        });
  }
  function success(){
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment Success",
        showConfirmButton: false,
        timer: 1500
    });

  }