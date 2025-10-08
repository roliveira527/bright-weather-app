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
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter city name (e.g., Manchester)"
            />
            <button type="submit">
                Search
            </button>
        </form>
    );
}