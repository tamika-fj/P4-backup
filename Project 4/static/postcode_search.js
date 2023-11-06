document.addEventListener("DOMContentLoaded", function () {
    let jsonData; // Define a variable to store the JSON data

    // Function to fetch JSON data
    function loadJSONData(callback) {
        fetch("Resources/doctors_data.json")
            .then(response => response.json())
            .then(data => {
                jsonData = data; // Store the data in the variable
                callback(data);
            });
    }

    // Function to search for an address based on the postcode
    function searchAddress(postcode, jsonData) {
        if (postcode in jsonData) {
            return jsonData[postcode].join(", ");
        }
        return "Address not found for the given postcode.";
    }

    // Handle form submission
    const form = document.getElementById("postcodeForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const postcodeInput = document.getElementById("postcode");
        const postcode = postcodeInput.value.trim();

        // Construct the data object
        const data = { Postcode: postcode };

        fetch("/Nearest_Doc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            const resultContainer = document.getElementById("resultContainer");
            resultContainer.textContent = data.address;
        });
    });
});
