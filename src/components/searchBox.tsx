"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const SUPPORTED_COUNTRIES = [
    { name: 'United Kingdom', code: 'uk' },
    { name: 'United States', code: 'us' },
    { name: 'Germany', code: 'de' },
];

interface SearchBoxProps {
    initialValue?: string;
    initialCountryCode?: string;
}

export default function SearchBox({ initialValue = '', initialCountryCode = 'uk' }: SearchBoxProps) {
    
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [countryCode, setCountryCode] = useState(initialCountryCode);
    
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const city = searchTerm.trim();

        if (city && countryCode) {
            router.push(`/weather/${countryCode}/${city}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-2">
            
            <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="p-2 h-[42] border border-gray-300 rounded-l-lg text-sm"
            >
                {SUPPORTED_COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.name} ({country.code.toUpperCase()})
                    </option>
                ))}
            </select>
            
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter city name (e.g., Manchester)"
                className="w-full max-w-xs p-2 border border-gray-300 text-black focus:outline-none"
                style={{ borderRadius: 0 }} 
            />
            
            <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition duration-150"
            >
                Search
            </button>
        </form>
    );
}