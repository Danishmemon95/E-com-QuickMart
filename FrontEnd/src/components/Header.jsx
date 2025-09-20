import React from 'react'
import { useGetTopProductsQuery } from "../Redux/api/productApiSlice";
import Loader from './Loader';
import SmallProduct from '@/pages/products/SmallProduct';
import ProductCarousel from '@/pages/products/ProductCarousel';
import logo from "../components/logo.png"

const Header = () => {

    const { data, isLoading, error } = useGetTopProductsQuery();

    if (isLoading) {
        return null;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (
        <>
            <div className="mobile-header-spacing">
                <div className="container-responsive">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        <div className="flex-shrink-0">
                            <img 
                                src={logo} 
                                alt="QuickMart Logo" 
                                className='w-32 h-16 sm:w-40 sm:h-20 lg:w-60 lg:h-28 mx-auto lg:mx-0' 
                            />
                        </div>
                        
                        <div className="flex-1 w-full">
                            <p className='font-bold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left mb-6'>
                                Top Products
                            </p>
                            
                            <div className="flex flex-col xl:flex-row gap-8">
                                <div className="w-full xl:w-2/3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {data.map((product) => (
                                            <div key={product._id}>
                                                <SmallProduct product={product} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="w-full xl:w-1/3">
                                    <ProductCarousel />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header
