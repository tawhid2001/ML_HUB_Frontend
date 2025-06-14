# ML HUB Frontend

A modern, responsive frontend for the Insurance Premium Prediction tool, built with HTML, CSS, JavaScript, and Bootstrap. The application predicts insurance premium categories based on user inputs using a machine learning model accessed through FastAPI.

## Features

- **Insurance Premium Prediction Form:** Interactive form with real-time validation
- **Modal Results Display:** Beautiful Bootstrap modal showing prediction results with:
  - Predicted category (High/Medium/Low)
  - Confidence score
  - Probability distribution visualization
- **Input Validation:** Comprehensive client-side validation for all fields
- **Responsive Design:** Mobile-friendly layout using Bootstrap 5
- **Reusable Components:** Dynamic navbar and footer
- **Contributors Page:** Team information

## Project Structure

```
├── index.html              # Home page with project overview
├── IPP_Form.html           # Insurance Premium Prediction form
├── contributors.html       # Contributors information
├── scripts/
│   ├── navbar.js          # Injects navbar into pages
│   └── footer.js          # Injects footer into pages
├── style/
│   └── style.css          # Custom styles
└── README.md              # Project documentation
```

## Input Fields and Validation

| Field      | Type    | Validation Rules                 | Description               |
| ---------- | ------- | -------------------------------- | ------------------------- |
| Age        | Integer | Range: 0-120                     | User's age in years       |
| Weight     | Number  | > 0                              | Weight in kilograms       |
| Height     | Number  | Range: 0-2.5                     | Height in meters          |
| Income     | Number  | > 0                              | Annual income in LPA      |
| Smoker     | Boolean | Yes/No                           | Smoking status            |
| City       | String  | Predefined list of Indian cities | Current city of residence |
| Occupation | String  | Predefined options               | Current employment status |

## API Integration

The frontend interacts with a FastAPI backend endpoint:

- **Endpoint:** `http://127.0.0.1:8000/predict`
- **Method:** POST
- **Response Format:**
  ```json
  {
    "response": {
      "predicted_category": "High/Medium/Low",
      "confidence": 0.0-1.0,
      "class_probabilities": {
        "High": 0.0-1.0,
        "Medium": 0.0-1.0,
        "Low": 0.0-1.0
      }
    }
  }
  ```

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tawhid2001/ML_HUB_Frontend.git
   cd ML_HUB_Frontend
   ```

2. **Start the Backend:**

   - Ensure the FastAPI backend is running on `http://127.0.0.1:8000`

3. **Launch the Frontend:**
   - Open `index.html` in your browser
   - Navigate to the prediction form
   - Enter your details and submit

## Usage

1. Navigate to the homepage (`index.html`)
2. Click on "Go To Prediction Page"
3. Fill out the form with your details:
   - All numeric fields accept decimal values
   - Age must be a whole number between 0-120
   - Height must be in meters (0-2.5m)
   - Select your city from the dropdown
4. Click "Predict Premium" to see results
5. View the prediction in a modal window showing:
   - Predicted category with confidence
   - Probability distribution for all categories

## Technologies Used

- HTML5, CSS3, JavaScript (ES6)
- Bootstrap 5.3.6
- FastAPI (Backend)
- Machine Learning Model Integration

## Contributors

- Mahadi Hasan — ML Trainer and Backend API Developer
- Tawhid Talal — Frontend Developer and UI/UX Designer

## License

MIT License - feel free to use and modify as needed.
