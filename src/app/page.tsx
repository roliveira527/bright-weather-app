import SearchBox from './components/searchBox';

export default function HomePage() {
  return (
    <div className="landing-container" style={{ textAlign: 'center', padding: '50px', backgroundColor: '#e0f7fa', minHeight: '100vh' }}>
      <h1>Bright Weather App</h1>
      <p>Welcome! Find the current weather conditions in any UK city.</p>
      
      <SearchBox /> 
      
    </div>
  );
}