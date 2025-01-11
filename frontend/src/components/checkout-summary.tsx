import { Product } from '@/types/product'

interface CheckoutSummaryProps {
  products: Product[]
}

export function CheckoutSummary({ products }: CheckoutSummaryProps) {
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0)
  const tax = subtotal * 0.13 // Assuming 13% tax
  const total = subtotal + tax

  return (
    <div className="space-y-6 p-6 rounded-xl bg-card shadow-sm">
      <h2 className="text-2xl font-semibold text-foreground">Order Summary</h2>
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between text-sm text-muted-foreground">
            <span>{product.name} (x{product.quantity})</span>
            <span>${(product.price * product.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Tax (13%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg text-foreground">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

