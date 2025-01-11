import Image from 'next/image'
import { Product } from '@/types/product'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface ProductItemProps {
  product: Product
  onQuantityChange: (id: string, quantity: number) => void
}

export function ProductItem({ product, onQuantityChange }: ProductItemProps) {
  return (
    <Card className="mb-4">
      <CardContent className="flex gap-4 p-4">
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
            <div className="text-right">
              <div className="font-medium">${product.price.toFixed(2)}</div>
              <a
                href={product.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {product.brand}
              </a>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Label htmlFor={`quantity-${product.id}`} className="w-16">
              Quantity
            </Label>
            <Input
              type="number"
              id={`quantity-${product.id}`}
              value={product.quantity}
              min={1}
              onChange={(e) => onQuantityChange(product.id, parseInt(e.target.value, 10))}
              className="w-20"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

