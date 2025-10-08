## ☀️ Bright Weather App
This is a dynamic weather application built with Next.js (App Router), React, and Tailwind CSS. It fetches current weather data from the OpenWeatherMap API for a user-specified city and country.

## 🚀 Getting Started
Follow these steps to set up and run the application on your local machine.

Prerequisites
You must have the following software installed:

Node.js (version 18 or higher recommended)

npm or Yarn

1. Clone the Repository
```Bash

git clone https://github.com/roliveira527/bright-weather-app.git
cd bright-weather-app
```
2. Install Dependencies
Install the required packages, including development dependencies for testing:

```Bash

npm install
# or
yarn install
```
3. Set Up API Key
The application requires an API key from OpenWeatherMap to fetch weather data.

Sign up for a free account at OpenWeatherMap.

Once you have your key, create a file named .env.local in the root directory of the project.

Add your API key to the file, using the variable name defined in the code:

# .env.local
NEXT_PUBLIC_WEATHER_API_KEY="YOUR_OPENWEATHERMAP_API_KEY_HERE"
4. Run the Application
Start the development server:

```Bash

npm run dev
# or
yarn dev
```
The application will now be running locally. Open your browser and navigate to: http://localhost:3000

🌐 Usage
Home Page (Start)
Navigate to the root URL (http://localhost:3000).

Enter a city name (e.g., London).

The default country code is UK. To search in a different country (e.g., USA), you must first navigate to the results page and use the search bar there.

Results Page (/weather/[countryCode]/[city])
The results page is where the core functionality resides:

Search: Use the search bar to enter a new city.

Country Selection: Use the Country dropdown located near the search box to select the desired country code (e.g., US, DE).

The weather data will automatically re-fetch whenever you change the city in the URL or select a new country code.

✅ Testing
The project uses Jest and React Testing Library for unit testing.

Run All Tests
Execute all tests defined in the __tests__ directory:

```Bash

npm test
# or
yarn test
```
Run Tests in Watch Mode
Run tests continuously as files change (recommended for active development):

```Bash

npm run test:watch
# or
yarn test:watch
```