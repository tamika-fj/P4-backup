//Initialise the page 
function init() {

  //set up data variable 
  let inputElement_one = document.getElementById("inputBloodPressure");
  let updateButton_one = document.getElementById("updateBloodPressure");
  let inputElement_two = document.getElementById("inputGlucoseReading");
  let updateButton_two = document.getElementById("updateGlucoseReading");
  let inputElement_three = document.getElementById("inputBMI");
  let updateButton_three = document.getElementById("updateBMI");
  

  //Build the default plots 
  BuildGaugeChartBP();
  BuildGaugeChartGlucose();
  BuildGaugeChartBMI();

   // Add click event listeners to the update buttons
   updateButton_one.addEventListener("click", () => {
    const inputValue = parseFloat(inputElement_one.value);
    updateGaugeChartBP(inputValue);
  });

  updateButton_two.addEventListener("click", () => {
    const inputValue = parseFloat(inputElement_two.value);
    updateGaugeChartGlucose(inputValue);
  });

  updateButton_three.addEventListener("click", () => {
    const inputValue = parseFloat(inputElement_three.value);
    updateGaugeChartBMI(inputValue);
  });
}

// Create a function to update the Blood Pressure gauge chart
function updateGaugeChartBP(value) {
    // Categorize the input value
    const category = categorizeBloodPressure(value);

    if (category !== "Invalid") {
        // Update the chart with the corresponding background color
        const colors = {
            "Low": "#f0f0f0",
            "Normal": "green",
            "Elevated": "yellow",
            "High Stage 1": "orange",
            "High Stage 2": "red",
        };
        gaugeChart.data.datasets[0].backgroundColor = [colors[category]];
        gaugeChart.update();
    }
  };

// Create a function to update the Glucose gauge chart
function updateGaugeChartGlucose(value) {
    // Categorize the input value
    const category = categorizeGlucose(value);

    if (category !== "Invalid") {
        // Update the chart with the corresponding background color
        const colors = {
            "Normal": "#f0f0f0",
            "Prediabetic": "orange",
            "Diabetic": "red",
        };
        gaugeChart.data.datasets[0].backgroundColor = [colors[category]];
        gaugeChart.update();
    }
}

// Create a function to update the BMI gauge chart
function updateGaugeChartBMI(value) {
    // Categorize the input value
    const category = categorizeBMI(value);

    if (category !== "Invalid") {
        // Update the chart with the corresponding background color
        const colors = {
            "Underweight": "#f0f0f0",
            "Normal Weight": "green",
            "Overweight": "yellow",
            "Obesity Class I": "orange",
            "Obesity Class II": "red",
            "Obesity Class III": "black",
        };
        gaugeChart.data.datasets[0].backgroundColor = [colors[category]];
        gaugeChart.update();
    }
  };

// Create a function to categorize the input value
function categorizeBloodPressure(value) {
  if (value >= 0 && value < 60) {
      return "Low";
  } else if (value >= 60 && value < 70) {
      return "Normal";
  } else if (value >= 70 && value < 80) {
      return "Elevated";
  } else if (value >= 80 && value < 90) {
      return "High Stage 1";
  } else if (value >= 90 && value <= 120) {
      return "High Stage 2";
  } else {
      return "Invalid";
  }
}

var BuildGuageChartBP = new Chart(document.getElementById("gaugeChart").getContext("2d"), {
    type: "indicator",
    data: {
      labels:["Diastolic Blood Pressure"],
      gauge: { axis: { visible: false, range: [0, 120] } },
      domain: { row: 0, column: 0 },
      datasets: [
        {
            data: [0],
            backgroundColor: ["#f0f0f0"],
        },
    ],
},
options: {
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    cutoutPercentage: 70,
    legend: {
        display: false,
    },
    tooltips: {
        enabled: false,
    },
    responsive: true,
},
});



var BuildGuageChartG = new Chart(document.getElementById("gaugeChart").getContext("2d"), {
  type: "indicator",
  data: {
    labels:["Plasma Glucose mg/dl"],
    gauge: { axis: { visible: false, range: [0, 300] } },
    domain: { row: 0, column: 0 },
    datasets: [
      {
          data: [0],
          backgroundColor: ["#f0f0f0"],
      },
  ],
},
options: {
  rotation: 1 * Math.PI,
  circumference: 1 * Math.PI,
  cutoutPercentage: 70,
  legend: {
      display: false,
  },
  tooltips: {
      enabled: false,
  },
  responsive: true,
},
});


// Create a function to categorize the input value
function categorizeBMI(value) {
  if (value >= 0 && value < 18.4) {
      return "Underweight";
  } else if (value >= 18.5 && value < 24.9) {
      return "Normal Weight";
  } else if (value >= 25 && value < 29.9) {
      return "Overweight";
  } else if (value >= 30 && value < 34.9) {
      return "Obesity Class I";
  } else if (value >= 35 && value <= 39.9) {
      return "Obesity Class II";
  } else if (value >= 40 && value <= 100) {
      return "Obesity Class III";
  } else {
      return "Invalid";
  }
}

var BuildGuageChartBMI = new Chart(document.getElementById("gaugeChart").getContext("2d"), {
    type: "indicator",
    data: {
      labels:["Body Mass Index"],
      gauge: { axis: { visible: false, range: [0, 100] } },
      domain: { row: 0, column: 0 },
      datasets: [
        {
            data: [0],
            backgroundColor: ["#f0f0f0"],
        },
    ],
  },
  options: {
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    cutoutPercentage: 70,
    legend: {
        display: false,
    },
    tooltips: {
        enabled: false,
    },
    responsive: true,
  },
  });