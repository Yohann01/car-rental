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
        ],
    }
]
        const carSelected = document.querySelectorAll('.car-select-btn');
        let chosenCar = cars[0]; // Initialize with the first car

        const currentCarImage = document.querySelector(".carImage");
        const currentCarModel = document.querySelector(".carModel");
        const currentCarMark = document.querySelector(".carMark");
        const currentCarYear = document.querySelector(".carYear");
        const currentCarDoor = document.querySelector(".doors");
        const currentCarStatusAC = document.querySelector(".acStatus");
        const currentCarTransmission = document.querySelector(".transmission");
        const currentCarFuel = document.querySelector(".fuelType");

        function updateCarDetails(index) {
            const chosenCar = cars[index];

            // Update car details
            currentCarModel.textContent = chosenCar.model;
            currentCarMark.textContent = chosenCar.mark;
            currentCarYear.textContent = chosenCar.year;
            currentCarStatusAC.textContent = chosenCar.ac;
            currentCarDoor.textContent = chosenCar.doors;
            currentCarTransmission.textContent = chosenCar.transmission;
            currentCarFuel.textContent = chosenCar.fuelType;
            currentCarImage.src = chosenCar.color[0].img;
            carSelected.forEach((carBtn, idx) => {
            if (idx === index) {
                carBtn.style.background = "#FF3714";
                carBtn.style.color = "white";
            } else {
                carBtn.style.background = "none";
                carBtn.style.color = "black";
            }
            });
        }
        updateCarDetails(0);

        // Add click event listener to each car selection button
        carSelected.forEach((carBtn, index) => {
        carBtn.addEventListener('click', () => {
            updateCarDetails(index); // Update car details and button styles
        });
        });
