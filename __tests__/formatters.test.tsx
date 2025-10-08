import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WeatherClient from '../src/components/weatherClient';

jest.mock('next/navigation');

const mockWeatherData = {
  name: 'Berlin',
  main: {
    temp: 15.5,
    feels_like: 14,
    humidity: 70,
    temp_min: 10,
    temp_max: 20
  },
  wind: { speed: 5 },
  weather: [{ description: 'light rain' }],
  rain: { '1h': 0.5 }
};

describe('WeatherClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'TEST_KEY';
  });

  it('should render the loading state initially', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    render(<WeatherClient initialCity="Berlin" initialCountryCode="de" />);

    expect(screen.getByText(/Loading weather for Berlin/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: (name) => name.includes('Weather Report') && name.includes('Berlin'),
        })
      ).toBeInTheDocument();
    });
  });

  it('should display weather data after successful fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherData,
    });

    render(<WeatherClient initialCity="Berlin" initialCountryCode="de" />);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: (name) =>
            name.includes('Weather Report') && name.includes('Berlin'),
        })
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/15.5°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Light Rain/i)).toBeInTheDocument();
    expect(screen.getByText(/0.5 mm/i)).toBeInTheDocument();
  });

  it('should display an error message on API failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    render(<WeatherClient initialCity="InvalidCity" initialCountryCode="uk" />);

    await waitFor(() => {
      expect(screen.getByText(/Error: City "InvalidCity" not found/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/Loading weather/i)).not.toBeInTheDocument();
  });
});
