'use client';

import { Room } from '@/app/Room';
import { StorageTldraw } from '@/components/StorageTldraw';
import { Suspense, useState, useTransition } from 'react';
import { Providers } from './Providers';
import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/product-card';
import { CheckoutSummary } from '@/components/checkout-summary';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { Loading } from '@/components/ui/loading';

export default function Home() {
    const [i, setI] = useState('');
    const [c, setC] = useState(false);
    const [e, setE] = useState(false);

    const [isPending, startTransition] = useTransition();

    const [d, setD] = useState<any[]>([]);

    async function sendPictures(base64img: string[]) {
        startTransition(async () => {
            const res = await fetch('http://localhost:5000/upload-pictures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pictures: base64img }),
            });

            const body = await res.json();

            console.log(body);

            setD(JSON.parse(body));
        });
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 
    [background-image:radial-gradient(#4b5563_1px,transparent_1px)] 
    [background-size:16px_16px] 
    [background-position:center]"
        >
            {e ? (
                <div>
                    <div className="h-svh flex items-center justify-center w-full">
                        <div className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
                            <button
                                onClick={() => {
                                    setC(true);
                                }}
                                className="w-full p-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md hover:shadow-lg text-4xl"
                            >
                                Purchase Successful ✅
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {!c ? (
                        <div className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg max-w-md w-full">
                            <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                                Welcome to Our Magical Space
                            </h1>

                            <div className="space-y-4 z-10">
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
                            </div>
                        </div>
                    ) : (
                        <div>
                            {d.length == 0 ? (
                                <div>
                                    {!isPending ? (
                                        <Suspense>
                                            <Providers name={i}>
                                                <Room>
                                                    <StorageTldraw
                                                        sendPictures={
                                                            sendPictures
                                                        }
                                                    />
                                                </Room>
                                            </Providers>
                                        </Suspense>
                                    ) : (
                                        <div>
                                            <Loading />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Container>
                                    <div>
                                        <h1 className="text-4xl font-bold mb-6 text-[#6b3859]">
                                            Event Items Checkout
                                        </h1>
                                        <div className="grid lg:grid-cols-3 gap-6">
                                            <div className="lg:col-span-2 space-y-4">
                                                {d.map((product: any, i) => (
                                                    <ProductCard
                                                        key={i}
                                                        product={product}
                                                        className="bg-white/40 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-200"
                                                    />
                                                ))}
                                            </div>
                                            <div className="space-y-4">
                                                <CheckoutSummary
                                                    products={d}
                                                    className="bg-white/40 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-200"
                                                />
                                                <Button
                                                    onClick={() => setE(true)}
                                                    className="w-full text-lg bg-[#834970] hover:bg-[#6b3859] text-white shadow-md hover:shadow-lg transition-all duration-200"
                                                >
                                                    Proceed to Checkout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Container>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
