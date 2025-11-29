from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained model and preprocessors
model = joblib.load('models/yield_prediction_model.pkl')
scalers = joblib.load('models/scalers.pkl')
encoders = joblib.load('models/encoders.pkl')
feature_columns = joblib.load('models/feature_columns.pkl')

@app.route('/predict', methods=['POST'])
def predict_yield():
    try:
        data = request.json
        
        # Create input dataframe
        input_data = pd.DataFrame([{
            'year_normalized': (data['year'] - 2010) / (2023 - 2010),
            'crop_encoded': encoders['crop'].transform([data['crop']])[0],
            'district_encoded': encoders['district'].transform([data['district']])[0],
            'season_encoded': encoders['season'].transform([data['season']])[0],
            'area_hectares': data['area_hectares'],
            'production_tonnes': data.get('production_tonnes', data['area_hectares'] * 3000),  # Estimate
            'area_log': np.log1p(data['area_hectares']),
            'production_log': np.log1p(data.get('production_tonnes', data['area_hectares'] * 3000)),
            'yield_trend_3yr': data.get('yield_trend_3yr', 3000),  # Default estimate
            'yield_trend_5yr': data.get('yield_trend_5yr', 3000)   # Default estimate
        }])
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        
        # Calculate confidence interval (±15%)
        lower = prediction * 0.85
        upper = prediction * 1.15
        
        return jsonify({
            'predicted_yield': float(prediction),
            'confidence_interval': {
                'lower': float(lower),
                'upper': float(upper)
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/crops', methods=['GET'])
def get_crops():
    return jsonify(encoders['crop'].classes_.tolist())

@app.route('/districts', methods=['GET'])
def get_districts():
    return jsonify(encoders['district'].classes_.tolist())

if __name__ == '__main__':
    app.run(debug=True, port=5000)