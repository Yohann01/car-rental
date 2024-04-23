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



const cars = [
    {
        id:1,
        name: "Honda Civic",
        model: "Civic",
        mark: "Honda",
        year: 2014,
        ac:	"Yes",
        doors: 4,
        transmission:"Automatic",
        fuelType: "Gasoline",
        color:[
            {
                code:"silver",
                img:" ./assets/rental-cars/honda-civic.png",
            }
            // {
            //     code:"orange",
            //     img:"./",
            // }
        ],
    },
    {
        id:2,
        name: "Hyundai Tucson",
        model: "Tucson",
        mark: "Hyundai",
        year: "2022",
        ac:	"Yes",
        doors: 4,
        transmission:"Automatic",
        fuelType: "Gasoline",
        color:[
            {
                code:"silver",
                 img:"./assets/rental-cars/hyundai-tucson.png",
            },
            {
                code:"white",
                img:"./assets/rental-cars/hyundai-tucson.png",
            }
            // {
            //     code:"orange",
            //     img:"./",
            // }
        ],
    },
    {
        id:3,
        name: "Toyota Vios",
        model: "Vios",
        mark: "Toyota",
        year: "2017",
        ac:	"Yes",
        doors: 4,
        transmission:"Automatic",
        fuelType: "Gasoline",
        color:[
            {
                code:"silver",
                img:"./assets/rental-cars/toyota-vios.png",
            }
            // {
            //     code:"orange",
            //     img:"./",
            // }
        ],
    },
    {
        id:4,
        name: "Nissan Almera",
        model: "Almera",
        mark: "Nissan",
        year: "2014",
        ac:	"Yes",
        doors: 4,
        transmission:"Manual",
        fuelType: "Gasoline",
        color:[
            {
                code:"silver",
                img:"./assets/rental-cars/nissan-almera.png",
            }
            // {
            //     code:"orange",
            //     img:"./",
            // }
        ],
    },
    {
        id:5,
        name: "Mitsubishi Lancer",
        model: "Lancer",
        mark: "Mitsubishi",
        year: "2020",
        ac:	"Yes",
        doors: 4,
        transmission:"Automatic",
        fuelType: "Gasoline",
        color:[
            {
                code:"silver",
                img:"./assets/rental-cars/mitsubishi-lancer.png",
            }
            // {
            //     code:"orange",
            //     img:"./",
            // }
        ],
    },
    {
        id:6,
        name: "Ford Fusion",
        model: "Fusion",
        mark: "Ford",
        year: "2019",
        ac:	"Yes",
        doors: 4,
        transmission:"Automatic",
        fuelType: "Gasoline",
        color:[
            {
                code:"silver",
                img:"./assets/rental-cars/ford-fusion.png",
            }
            // {
            //     code:"orange",
            //     img:"./",
            // }
        ],
    }
]


const carSelected = document.querySelectorAll('.car-select-btn');
// carSelected[0].style.background = "#FF3714"
// carSelected[0].style.color = "white"

let chosenCar = cars[0]


const currentCarImage = document.querySelector(".carImage")
const currentCarModel = document.querySelector(".carModel")
const currentCarMark = document.querySelector(".carMark")
const currentCarYear = document.querySelector(".carYear")
const currentCarDoor = document.querySelector(".doors")
const currentCarStatusAC = document.querySelector(".acStatus")
const currentCarTransmission = document.querySelector(".transmission")
const currentCarFuel = document.querySelector(".fuelType")




carSelected.forEach((carBtn, index) =>{
    carBtn.addEventListener('click',() =>{
        chosenCar = cars[index]
        
        currentCarModel.textContent = chosenCar.model
        currentCarMark.textContent = chosenCar.mark
        currentCarYear.textContent = chosenCar.year
        currentCarStatusAC.textContent = chosenCar.ac
        currentCarDoor.textContent = chosenCar.doors
        currentCarTransmission.textContent = chosenCar.transmission
        currentCarFuel.textContent = chosenCar.fuelType

        currentCarImage.src = chosenCar.color[0].img
    })
})

carSelected.forEach((carBtn, index) =>{
    carBtn.addEventListener('click',() =>{
        carSelected.forEach(carBtn => {
            carBtn.style.background = "none"
            carBtn.style.color = "black"

        })
        carBtn.style.background = "#FF3714"
        carBtn.style.color = "white"

    })
})