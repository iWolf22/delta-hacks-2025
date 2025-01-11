export interface Product {
	id: string
	name: string
	description: string
	brand: string
	sourceUrl: string
	price: number
	quantity: number
	imageUrl: string
  }
  
export interface CartTotal {
  subtotal: number
  tax: number
  total: number
}
  
  