import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Diabetes_project.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
print(Base.metadata.tables.keys())

# Save reference to the table
Diabetes = Base.classes.DiabetesData

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/diabetes_info<br/>"
    
    )


@app.route("/api/v1.0/diabetes_info")
def diabetes_info():
    session=Session(engine)
    results=session.query(Diabetes.id, Diabetes.Glucose, Diabetes.BloodPressure, Diabetes.SkinThickness, Diabetes.Insulin, Diabetes.BMI,
                          Diabetes.DiabetesPedigreeFunction, Diabetes.Age, Diabetes.Outcome, Diabetes.BloodPressureRange,
                          Diabetes.GlucoseRange, Diabetes.BMIRange, Diabetes.EncodedBP, Diabetes.EncodedGlucose, Diabetes.EncodedBMI).all()
    session.close()
    
    all_diabetes_data=[]
    for id, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age, Outcome, BloodPressureRange, GlucoseRange, BMIRange, EncodedBP, EncodedGlucose, EncodedBMI in results:
        diabetes_dict={}
        diabetes_dict["id"]=id
        diabetes_dict["Glucose"]=Glucose
        diabetes_dict["BloodPressure"]=BloodPressure
        diabetes_dict["SkinThickness"]=SkinThickness
        diabetes_dict["Insulin"]=Insulin
        diabetes_dict["BMI"]=BMI
        diabetes_dict["DiabetesPedigreeFunction"]=DiabetesPedigreeFunction
        diabetes_dict["Age"]=Age
        diabetes_dict["Outcome"]=Outcome
        diabetes_dict["BloodPressureRange"]=BloodPressureRange
        diabetes_dict["GlucoseRange"]=GlucoseRange
        diabetes_dict["BMIRange"]=BMIRange
        diabetes_dict["EncodedBP"]=EncodedBP
        diabetes_dict["EncodedGlucose"]=EncodedGlucose
        diabetes_dict["EncodedBMI"]=EncodedBMI
        
    
        all_diabetes_data.append(diabetes_dict)
    return jsonify(all_diabetes_data)


if __name__ == '__main__':
    app.run(debug=True)
