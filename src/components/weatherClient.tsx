"use client";

import React, { useState, useEffect } from 'react';
import SearchBox from './searchBox';
import { capitalizeWords } from '../utils/formatters';

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

interface WeatherClientProps {
    initialCity: string;
    initialCountryCode: string;
}

const WeatherClient = ({ initialCity, initialCountryCode }: WeatherClientProps) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async (cityToSearch: string, code: string) => {
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

        if (!API_KEY) {
            setError('API Key invalid or not found.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const url = `${BASE_URL}?q=${cityToSearch},${code}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`City "${cityToSearch}" not found in country code ${code}.`);
                }
                throw new Error(`Failed to fetch data (HTTP status: ${response.status})`);
            }

            const data: WeatherData = await response.json();
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

    useEffect(() => {
        fetchWeatherData(initialCity, initialCountryCode);

    }, [initialCity, initialCountryCode]);

    return (
        <div className="text-center p-12 min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/assets/background.jpg')]">

            <div className="max-w-xl mx-auto p-4 bg-white/90 rounded-xl shadow-xl text-gray-800 border-2 border-black">
                <SearchBox initialValue={initialCity} initialCountryCode={initialCountryCode} />
            </div>

            <div className="max-w-xl mx-auto mt-6 p-6 bg-white/90 rounded-xl shadow-xl text-gray-800 border-2 border-black">
                {loading && <p className="text-blue-600 font-medium">Loading weather for {initialCity}...</p>}

                {error && <p className="text-red-600 font-medium" style={{ color: 'red' }}>Error: {error}</p>}

                {weatherData && (
                    <div className="text-left mt-4 space-y-2">
                        <h1 className="text-2xl font-bold mb-4 border-b pb-2">Weather Report for {weatherData.name} ({initialCountryCode.toUpperCase()})</h1>

                        <p><strong>Weather Conditions:</strong> {capitalizeWords(weatherData.weather[0].description)}</p>
                        <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
                        <p><strong>Feels Like:</strong> {weatherData.main.feels_like}°C</p>
                        <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                        <p><strong>Min. Temperature:</strong> {weatherData.main.temp_min}°C</p>
                        <p><strong>Max. Temperature:</strong> {weatherData.main.temp_max}°C</p>
                        <p><strong>Wind Speed:</strong> {weatherData.wind.speed}mph</p>

                        {weatherData.rain?.['1h'] && (
                            <p><strong>Rain Volume (Last Hr):</strong> {weatherData.rain['1h']} mm</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherClient;