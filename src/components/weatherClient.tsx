"use client";

import React, { useState, useEffect } from 'react';
import SearchBox from './searchBox';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const SUPPORTED_COUNTRIES = [
    { name: 'United Kingdom', code: 'uk' },
    { name: 'United States', code: 'us' },
    { name: 'Germany', code: 'de' },
];

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
}

const WeatherClient = ({ initialCity }: WeatherClientProps) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [countryCode, setCountryCode] = useState('uk');


    const capitalizeWords = (str: string): string => {
        return str.split(' ')
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(' ');
    };

    const fetchWeatherData = async (cityToSearch: string, code: string) => {
        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const url = `${BASE_URL}?q=${cityToSearch},${code}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`City "${cityToSearch}" not found in supported country.`);
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
        if (!API_KEY) {
            setError('API Key invalid or not found.');
            setLoading(false);
            return;
        }

        fetchWeatherData(initialCity, countryCode);

    }, [initialCity, countryCode]);

    return (
        <div className="text-center p-12 min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/assets/background.jpg')]">
            <div className="max-w-xl mx-auto bg-white/90 rounded-xl shadow-xl text-gray-800 border-2 border-black">
                <SearchBox initialValue={initialCity} />
            </div>

            <div className="max-w-xl mx-auto mt-6 p-6 bg-white/90 rounded-xl shadow-xl text-gray-800 border-2 border-black">
                <div className="flex justify-center items-center mb-4 space-x-2">
                    <label htmlFor="country-select" className="font-semibold">Country:</label>
                    <select
                        id="country-select"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="p-1 border border-gray-300 rounded-lg text-sm"
                        disabled={loading}
                    >
                        {SUPPORTED_COUNTRIES.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                {loading && <p>Loading weather for {initialCity}...</p>}

                {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                {weatherData && (
                    <div>
                        <h1 className="text-xl font-semibold mb-8">Weather Report: {weatherData.name}</h1>

                        <p>Weather Conditions: {capitalizeWords(weatherData.weather[0].description)}</p>
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
        </div>
    );
};

export default WeatherClient;