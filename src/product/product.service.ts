import { Injectable } from '@nestjs/common'
import { Product } from './product.model'

@Injectable()
export class ProductService {
	private products: Product[] = [];
	private idCounter = 1;

	findAll(): Product[] {
		return this.products
	}

	findOne(id: number): Product | 'null' {

		const product = this.products.find((product) => product.id === id)
		if (!product) return 'null';
		return product
	}

	create(product: Omit<Product, 'id'>): Product {
		const newProduct: Product = {
			id: this.idCounter++,
			...product,
		}
		this.products.push(newProduct)
		console.log(this.products)
		return newProduct
	}

	update(id: number, updatedProduct: Partial<Product>): Product {
		const productIndex = this.products.findIndex((product) => product.id === id)
		if (productIndex === -1) return null

		const updated = { ...this.products[productIndex], ...updatedProduct }
		this.products[productIndex] = updated
		return updated
	}

	remove(id: number): boolean {
		const productIndex = this.products.findIndex((product) => product.id === id)
		if (productIndex === -1) return false

		this.products.splice(productIndex, 1)
		return true
	}
}
