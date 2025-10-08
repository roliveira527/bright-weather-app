import WeatherClient from '../../../../components/weatherClient';

interface WeatherPageProps {
  params: Promise<{
    countryCode: string;
    city: string;
  }>;
}

export default async function WeatherResultsPage({ params }: WeatherPageProps) {
  const { city: encodedCity, countryCode: encodedCountryCode } = await params;
  
  const city = decodeURIComponent(encodedCity);
  const countryCode = decodeURIComponent(encodedCountryCode);

  return <WeatherClient initialCity={city} initialCountryCode={countryCode} />;
}