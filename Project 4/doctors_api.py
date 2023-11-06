import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Doctors_data.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
print(Base.metadata.tables.keys())

# Save reference to the table
Doctor = Base.classes.DoctorsData

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
        f"/api/v1.0/doctors_information<br/>"
    
    )


@app.route("/api/v1.0/doctors_information")
def doctors_information():
    session=Session(engine)
    results=session.query(Doctor.index, Doctor.postcode, Doctor.Name, Doctor.Address).all()
    session.close()
    
    doctor_data=[]
    for index, postcode, Name, Address in results:
        doctors_dict={}
        doctors_dict["index"]="index"
        doctors_dict["postcode"]=postcode
        doctors_dict["Name"]=Name
        doctors_dict["Address"]=Address
        
        
    
        doctor_data.append(doctors_dict)
    return jsonify(doctor_data)

if __name__ == '__main__':
    app.run(debug=True)
