import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify

# Flask Setup
app = Flask(__name__)

# Database Setup
db_file = "Resources/health_info.db"  # Replace with your actual database file path
engine = create_engine(f"sqlite:///{db_file}")

# Reflect an existing database into a new model
Base = automap_base()
Base.prepare(engine, reflect=True)

# Map the tables
Diabetes = Base.classes.diabetes_data_with_index
Doctor = Base.classes.doctor_address_data

# Flask Routes
# ... (your routes go here)

if __name__ == '__main__':
    app.run(debug=True, port=5001)