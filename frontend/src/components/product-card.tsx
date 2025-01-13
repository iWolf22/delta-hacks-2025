import Image from 'next/image';
import { Product } from '@/types/product';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: any) {
    return (
        <div
            className={`p-6 rounded-lg bg-white/70 backdrop-blur-sm ${className}`}
        >
            <div className="flex gap-6">
                {product.image ? (
                    <img
                        src={
                            product.image ||
                            'https://cdn-icons-png.flaticon.com/512/4957/4957066.png'
                        }
                        alt={product.name}
                        className="rounded-md object-cover w-[120px] h-[120px]"
                    />
                ) : (
                    <iframe
                        src={product.sourceUrl}
                        height="120"
                        width="120"
                    ></iframe>
                )}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-[#6b3859]">
                            {product.name}
                        </h3>
                        <p className="text-sm text-[#9a6084]">
                            <Link href={product.sourceUrl} target="_blank">
                                {product.brand}
                            </Link>
                        </p>
                    </div>
                    <p className="text-[#7c4368] mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-[#6b3859]">
                            ${product.price}
                        </span>
                        <span className="text-[#834970]">Qty: 1</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
