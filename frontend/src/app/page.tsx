'use client';

import { Room } from '@/app/Room';
import { StorageTldraw } from '@/components/StorageTldraw';
import { Suspense, useState } from 'react';
import { Providers } from './Providers';

export default function Home() {
    const [i, setI] = useState('');
    const [c, setC] = useState(false);

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 
    [background-image:radial-gradient(#4b5563_1px,transparent_1px)] 
    [background-size:16px_16px] 
    [background-position:center]"
        >
            {!c ? (
                <div className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                        Welcome to Our Magical Space
                    </h1>

                    <form className="space-y-4 z-10">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-purple-700 font-medium"
                            >
                                What's your name?
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your magical name..."
                                value={i}
                                onChange={(e) => setI(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-300 focus:outline-none transition-all placeholder:text-pink-300"
                            />
                        </div>
                        <button
                            onClick={() => {
                                setC(true);
                            }}
                            className="w-full py-2 px-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md hover:shadow-lg"
                        >
                            Begin the Journey ✨
                        </button>
                    </form>
                </div>
            ) : (
                <Suspense>
                    <Providers name={i}>
                        <Room>
                            <StorageTldraw />
                        </Room>
                    </Providers>
                </Suspense>
            )}
        </div>
    );
}
