import SearchBox from '../components/searchBox';

export default function HomePage() {
    return (
        <div className="text-center p-12 bg-[url('/assets/background.jpg')] min-h-screen">
            <div className="bg-white/90 rounded-xl border-2 border-black pb-4">
                <h1 className="text-xl font-semibold pt-3">Bright Weather App</h1>
                <p className="mt-2 mb-6">Welcome! Find the current weather conditions in your city.</p>

                <SearchBox />
            </div>


        </div>
    );
}