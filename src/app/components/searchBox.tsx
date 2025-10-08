"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBoxProps {
    initialValue?: string;
}

export default function SearchBox({ initialValue = '' }: SearchBoxProps) {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const city = searchTerm.trim();

        if (city) {
            router.push(`/weather/${city}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex justify-center gap-4 py-4">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter city name (e.g., Manchester)"
                className="w-full max-w-xs p-2 border border-gray-300 rounded-lg text-black"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
            >
                Search
            </button>
        </form>
    );
}