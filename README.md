# Football Fixture Risk Predictor

Football Fixture Risk Predictor is a React application that uses ChatGPT’s API to predict football fixtures based on various factors such as risk level, number of teams, and specific leagues. This tool is designed to help users make informed decisions about football match outcomes by providing predictions and insights into potential risks associated with different fixtures.

## Features

- **Risk-Based Predictions:** Get predictions for football fixtures based on different risk factors.
- **Customisable Options:** Input the number of teams and select specific leagues to tailor predictions to your preferences.
- **User-Friendly Interface:** Easy-to-use interface designed for both football enthusiasts and analysts to access predictions and insights quickly.
- **Powered by ChatGPT:** Utilises the power of ChatGPT’s API to deliver accurate and insightful predictions.

## Getting Started

### Prerequisites

To run this application, you will need to have the following installed on your machine:

- [Yarn](https://yarnpkg.com/) (Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/football-fixture-risk-predictor.git
    ```

2. Navigate to the project directory:

    ```bash
    cd football-fixture-risk-predictor
    ```

3. Install the dependencies:

    ```bash
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root directory of your project to store your environment variables. Add your ChatGPT API key and other configuration settings:

```plaintext
REACT_APP_CHATGPT_API_KEY=your_chatgpt_api_key
