document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById("bookingForm");

    bookingForm.addEventListener('submit', function(e) {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Perform form validation checks here
        const carType = document.getElementById("carType").value;
        const pickUpLoc = document.getElementById("pickupLocation").value;
        const pickUpDate = document.getElementById("pickupDate").value;
        const dropOffLoc = document.getElementById("dropoffLocation").value;
        const dropOffDate = document.getElementById("dropoffDate").value;

        if (carType === 'default' || pickUpLoc === 'default' || pickUpDate === '' || dropOffLoc === 'default' || dropOffDate === '') {
        // Display error message or perform error handling
        Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Fill out all required fields",
        timer: 1200,
        showConfirmButton: false,
        });
        return; // Stop further execution
        }

        // If all validation checks pass, you can proceed with form submission
        bookingForm.submit(); // Uncomment this line to submit the form programmatically
    });
    });

