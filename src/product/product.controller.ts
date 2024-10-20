import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { ProductService } from './product.service'
import { Product } from './product.model'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@Get()
	findAll(): Product[] {
		return this.productService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Product | 'null' {
		return this.productService.findOne(Number(id))
	}

	@Post()
	create(@Body() product: Omit<Product, 'id'>): Product {
		return this.productService.create(product)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() product: Partial<Product>): Product {
		return this.productService.update(Number(id), product)
	}

	@Delete(':id')
	remove(@Param('id') id: string): boolean {
		return this.productService.remove(Number(id))
	}
}
