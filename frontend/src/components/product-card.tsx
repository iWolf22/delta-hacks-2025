import Image from 'next/image'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <div className={`p-6 rounded-lg bg-white/70 backdrop-blur-sm ${className}`}>
      <div className="flex gap-6">
        <Image 
          src={product.imageUrl} 
          alt={product.name}
          width={120}
          height={120}
          className="rounded-md object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[#6b3859] mb-2">{product.name}</h3>
          <p className="text-[#7c4368] mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-[#6b3859]">${product.price}</span>
            <span className="text-[#834970]">Qty: {product.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

