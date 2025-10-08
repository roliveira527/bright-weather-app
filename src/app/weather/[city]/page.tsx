import WeatherClient from '../../../components/weatherClient';

interface WeatherPageProps {
  params: {
    city: string;
  };
}

export default async function WeatherResultsPage({ params }: WeatherPageProps) {
  const city = decodeURIComponent(params.city);

  return <WeatherClient initialCity={city} />;
}
