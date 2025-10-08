import React, { useState, useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    wind: {
        speed: number;
    };
    weather: {
        description: string;
    }[];
    rain?: {
        '1h'?: number;
    };
}

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const initialCity = 'London';

    const fetchWeatherData = async (cityToSearch: string) => {
        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const url = `${BASE_URL}?q=${cityToSearch},uk&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`City "${cityToSearch}" not found. Please check spelling.`);
                }
                throw new Error(`Failed to fetch data (HTTP status: ${response.status})`);
            }

            const data = await response.json();
            setWeatherData(data);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    // useEffect hook

    return (
        <div className="weather-container">
            <h1>UK Weather Finder</h1>

            {loading && <p>Loading weather for {initialCity}...</p>}

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;