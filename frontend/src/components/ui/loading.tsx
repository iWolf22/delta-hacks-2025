'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function Loading() {
    const images = ['/cups.png', '/food.png', '/pastry.png', '/picnic.png'];

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="rounded-xl p-8 relative h-[400px] w-[300px] mt-20">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out"
                        style={{
                            animation: `shuffle 3s infinite ${index * 0.5}s ease-in-out`,
                            zIndex: index,
                        }}
                    >
                        <Image
                            src={src}
                            alt="Loading"
                            width={200}
                            height={200}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                ))}
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#6b3859] text-lg">
                    Loading...
                </p>
            </div>
        </div>
    );
}
