function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}


// JavaScript to handle modal visibility
const modal = document.getElementById("myModal");
const modalBtn = document.getElementById("openModalBtn")
modalBtn.addEventListener("click", function(event) {
    // Prevent the default behavior of the button (e.g., form submission)
    event.preventDefault();
// Function to show the modal

    modal.style.display = 'flex';

});

// Function to hide the modal
function closeModal() {
    modal.style.display = 'none';
}

