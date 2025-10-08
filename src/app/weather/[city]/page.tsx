"use client";

import React, { useState, useEffect } from 'react';
import SearchBox from '../../components/searchBox';

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

interface WeatherPageProps {
    params: {
        city: string;
    };
}

const WeatherResultsPage = ({ params }: WeatherPageProps) => {
    const urlCity = decodeURIComponent(params.city);

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const capitalizeWords = (str: string): string => {
        return str.split(' ')
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(' ');
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

        fetchWeatherData(urlCity);
    }, [urlCity]);

    return (
        <div className="text-center p-12 min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/assets/background.jpg')]">
            <div className="max-w-xl mx-auto bg-white/90 rounded-xl shadow-xl text-gray-800 border-2 border-black">
                <SearchBox initialValue={urlCity} />
            </div>

            <div className="max-w-xl mx-auto mt-6 p-6 bg-white/90 rounded-xl shadow-xl text-gray-800 border-2 border-black">
                {loading && <p>Loading weather for {urlCity}...</p>}

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

export default WeatherResultsPage;