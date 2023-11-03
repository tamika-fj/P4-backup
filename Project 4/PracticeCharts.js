// Initialize the page
function init() {
    // Set up data variables
    let inputElement_one = document.getElementById("inputElement_one");
    let UpdateButton_one = document.getElementById("UpdateButton_one");
  
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
  
    inputElement_one.addEventListener("input", updateValue);
  
    function updateValue() {
      // Get the value of the input element when the user types
      let inputValue = parseFloat(inputElement_one.value);
      // Now you can use inputValue in your code
      console.log("Input Value:", inputValue);
  
      // Check if the input value is a valid number
      if (isNaN(inputValue)) {
        console.log("Invalid input. Please enter a number.");
        return;
      }
  
      // Build the default plots
      buildgaugeChartBP();
  
      // Function that builds the chart
      buildgaugeChartBP(inputValue);
  
      // Set up the trace for the gauge chart
      let BPdata = {
        value: inputValue,
        domain: { x: [0, 1], y: [0, 1] },
        title: {
          text: "<b>Diastolic Blood Pressure Range",
          font: { color: "black", size: 16 }
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [0, 10], tickmode: "linear", tick0: 2, dtick: 2 },
          bar: { color: "black" },
          steps: [
            { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
            { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
            { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
            { range: [4, 5], color: "rgba(202, 209, 95, .5)" },
            { range: [5, 6], color: "rgba(184, 205, 68, .5)" },
            { range: [6, 7], color: "rgba(170, 202, 42, .5)" },
          ]
        }
      };
  
      // Set up the Layout
      let layout = {
        width: 400,
        height: 400,
        margin: { t: 0, b: 0 }
      };
  
      // Create the gauge chart with the initial data and layout
      Plotly.newPlot("gaugeChartBP", [BPdata], layout);
    }
}