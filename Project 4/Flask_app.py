from flask import Flask, render_template, request

app = Flask(__name__)

# Define initial values for the gauges
initial_bp = 0
initial_glucose = 0
initial_bmi = 0

@app.route('/')
def index():
    return render_template('Pandas_HTML.html', bp=initial_bp, glucose=initial_glucose, bmi=initial_bmi)

@app.route('/update', methods=['POST'])
def update():
    global initial_bp, initial_glucose, initial_bmi

    # Get the values from the form
    bp_str = request.form.get('bp')
    glucose_str = request.form.get('glucose')
    bmi_str = request.form.get('bmi')

    # Check if the form fields are not empty
    if bp_str is not None:
        bp = float(bp_str)
    else:
        bp = 0  # Default to 0 if "None"

    if glucose_str is not None:
        glucose = float(glucose_str)
    else:
        glucose = 0  # Default to 0 if "None"

    if bmi_str is not None:
        bmi = float(bmi_str)
    else:
        bmi = 0  # Default to 0 if "None"

    # Categorize the input values for BP, Glucose, and BMI
    category_bp = categorize_blood_pressure(bp)
    category_glucose = categorize_glucose(glucose)
    category_bmi = categorize_bmi(bmi)

    initial_bp = bp
    initial_glucose = glucose
    initial_bmi = bmi

    return render_template('Pandas_HTML.html', bp=initial_bp, glucose=initial_glucose, bmi=initial_bmi,
                           category_bp=category_bp, category_glucose=category_glucose, category_bmi=category_bmi)

def categorize_blood_pressure(value):
    if 0 <= value < 60:
        return "Low"
    elif 60 <= value < 70:
        return "Normal"
    elif 70 <= value < 80:
        return "Elevated"
    elif 80 <= value < 90:
        return "High Stage 1"
    elif 90 <= value <= 120:
        return "High Stage 2"
    else:
        return "Invalid"

def categorize_glucose(value):
    if 0 <= value < 139:
        return "Normal"
    elif 140 <= value < 199:
        return "Prediabetic"
    elif 200 <= value < 300:
        return "Diabetic"
    else:
        return "Invalid"

def categorize_bmi(value):
    if 0 <= value < 18.4:
        return "Underweight"
    elif 18.5 <= value < 24.9:
        return "Normal Weight"
    elif 25 <= value < 29.9:
        return "Overweight"
    elif 30 <= value < 34.9:
        return "Obesity Class I"
    elif 35 <= value <= 39.9:
        return "Obesity Class II"
    elif 40 <= value <= 100:
        return "Obesity Class III"
    else:
        return "Invalid"

if __name__ == '__main__':
    app.run(debug=True)

