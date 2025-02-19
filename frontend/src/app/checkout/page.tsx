'use client'
import { useState, useEffect } from 'react'
import { Container } from "@/components/ui/container"
import { ProductCard } from "@/components/product-card"
import { CheckoutSummary } from "@/components/checkout-summary"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/product"
import { Loading } from "@/components/ui/loading"

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await fetch('http://localhost:5000/products')
        const data = await response.json()
        console.log('Fetched products:', data)
        setProducts(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  console.log('Current products state:', products)

  if (isLoading) return <Loading />

  if (products.length === 0) {
    return <div>No products found</div>
  }

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-6 text-[#6b3859]">Event Items Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className="bg-white/40 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-200"
            />
          ))}
        </div>
        <div className="space-y-4">
          <CheckoutSummary 
            products={products} 
            className="bg-white/40 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-200"
          />
          <Button className="w-full text-lg bg-[#834970] hover:bg-[#6b3859] text-white shadow-md hover:shadow-lg transition-all duration-200">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </Container>
  )
}

