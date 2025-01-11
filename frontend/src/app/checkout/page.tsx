import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { CheckoutSummary } from "@/components/checkout-summary"
import { Container } from "@/components/ui/container"
import { sampleProducts } from "@/data/sample-products"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d9a7c7] to-[#fffcdc]">
      <div className="container mx-auto py-4 px-4">
        <Container>
          <h1 className="text-4xl font-bold mb-6 text-[#6b3859]">Event Items Checkout</h1>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {sampleProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  className="bg-white/40 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-200"
                />
              ))}
            </div>
            <div className="space-y-4">
              <CheckoutSummary 
                products={sampleProducts} 
                className="bg-white/40 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-200"
              />
              <Button className="w-full text-lg bg-[#834970] hover:bg-[#6b3859] text-white shadow-md hover:shadow-lg transition-all duration-200">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

