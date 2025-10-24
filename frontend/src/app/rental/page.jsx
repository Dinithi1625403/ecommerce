import { useState } from 'react';

'use client';


export default function RentalPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [rentalItems, setRentalItems] = useState([
        { id: 1, name: 'Camera Equipment', price: 50, image: '/placeholder-camera.jpg' },
        { id: 2, name: 'Laptop', price: 30, image: '/placeholder-laptop.jpg' },
        { id: 3, name: 'Party Tent', price: 100, image: '/placeholder-tent.jpg' },
    ]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredItems = rentalItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Rental Items</h1>
            
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search rental items..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 shadow-md">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-600 mb-4">${item.price}/day</p>
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            Rent Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}