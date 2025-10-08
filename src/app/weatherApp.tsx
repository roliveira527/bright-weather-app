"use client";

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
    const initialCity = 'London';

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(initialCity);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchTerm.trim()) {
            fetchWeatherData(searchTerm.trim());
        }
    };

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
            console.log(data)

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

    useEffect(() => {
        if (!API_KEY) {
            setError('API Key invalid or not found.');
            setLoading(false);
            return;
        }

        fetchWeatherData(initialCity);
    }, []);

    return (
        <div className="weather-container">
            <h1>UK Weather Finder</h1>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter city name (e.g., Manchester)"
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    Search
                </button>
            </form>

            {loading && <p>Loading weather for {searchTerm}...</p>}

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Weather Conditions: {weatherData.weather[0].description}</p>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Feels Like: {weatherData.main.feels_like}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Min. Temperature: {weatherData.main.temp_min}°C</p>
                    <p>Max. Temperature: {weatherData.main.temp_max}°C</p>
                    <p>Wind Speed: {weatherData.wind.speed}mph</p>
                    {weatherData.rain?.['1h'] && (
                        <p>Rain Volume (Last Hr): {weatherData.rain['1h']} mm</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default WeatherApp;