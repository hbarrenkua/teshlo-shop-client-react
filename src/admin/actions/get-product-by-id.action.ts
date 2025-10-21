import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";
import type { User } from "@/interfaces/user.interface";

export const getProductByIdAction = async (id: string): Promise<Product> => {

    if (!id)
        throw new Error('id is required');


    if (id === 'new')
        return {
            id: 'new',
            title: '',
            price: 0,
            description: '',
            slug: '',
            gender: 'unisex',
            images: [],
            sizes: [],
            stock: 0,
            tags: [],
            user: {} as User


        } as unknown as Product


    const { data } = await tesloApi.get<Product>(`/products/${id}`)


    const images = data.images.map(i => {
        if (i.includes('http')) return i
        return `${import.meta.env.VITE_API_URL}/files/product/${i}`
    })

    return {
        ...data,
        images
    }



}