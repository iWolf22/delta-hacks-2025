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
                <img
                    src={
                        product.image ||
                        'https://cdn-icons-png.flaticon.com/512/4957/4957066.png'
                    }
                    alt={product.name}
                    width={120}
                    height={120}
                    className="rounded-md object-cover"
                />
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-[#6b3859]">
                            {product.name}
                        </h3>
                        <p className="text-sm text-[#9a6084]">
                            <Link href={product.sourceUrl}>
                                {product.brand}
                            </Link>
                        </p>
                    </div>
                    <p className="text-[#7c4368] mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-[#6b3859]">
                            ${product.price}
                        </span>
                        <span className="text-[#834970]">
                            Qty: {product.quantity}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
