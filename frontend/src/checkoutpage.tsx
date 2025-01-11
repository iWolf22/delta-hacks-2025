'use client'

import { useState } from 'react'
import { ProductItem } from './components/product-item'
import { sampleProducts } from '@/data/sample-products'
import { Product, CartTotal } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity } : product
    ))
  }

  const calculateTotals = (): CartTotal => {
    const subtotal = products.reduce((sum, product) => 
      sum + (product.price * product.quantity), 0
    )
    const tax = subtotal * 0.13 // 13% tax rate
    return {
      subtotal,
      tax,
      total: subtotal + tax
    }
  }

  const handleCheckout = () => {
    // Handle checkout logic here
    console.log('Proceeding to checkout with products:', products)
  }

  const totals = calculateTotals()

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">Event Items Checkout</h1>
        
        <div className="grid gap-6 md:grid-cols-[1fr,300px]">
          <div className="space-y-4">
            {products.map(product => (
              <ProductItem
                key={product.id}
                product={product}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (13%)</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

