import React from 'react'
import { useGetTopProductsQuery } from "../../Redux/api/productApiSlice";
import Message from "../../components/Message";
import moment from "moment";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();
    return (
        <Carousel className="p-3 w-[33rem] mr-[10rem] h-[100%] flex justify-center items-center">
            <CarouselContent>

                {products.map((product, index) => (
                    <CarouselItem key={index}>
                        <img src={product.image} alt="" className='rounded-3xl p-3 h-[27rem] w-[32rem]' />
                        <div className='mt-5 px-5'>
                            <div className='flex justify-between items-center'>
                                <h2 className='font-bold text-2xl'>{product.name}</h2>
                                <p className='font-semibold text-xl mr-[2rem]'>$ {product.price}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <h2 className='font-medium text-lg'>{product.brand}</h2>
                                <div>
                                    <p className='text-center font-medium mr-[1.3rem]'>Reviews: {product.rating}</p>
                                    <p className='text-center font-medium'>Ratings: {Math.round(product.rating)} {"  "} ⭐ </p>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                                <p className='w-[100%]'> {product.description.substring(0, 100)}...</p>
                                <p className='ml-[2rem]'>Added: {moment(product.createdAt).fromNow()}</p>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default ProductCarousel
