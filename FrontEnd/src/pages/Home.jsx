import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../Redux/api/productApiSlice"
import Loader from '@/components/Loader';
import Message from "@/components/Message";
import Header from "@/components/Header";
import Product from './products/Product';

const Home = () => {

    const { keyword } = useParams();
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });

    return (
        <>
            {!keyword ? <Header /> : null}
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Message variant="danger">
                    {isError?.data.message || isError.error}
                </Message>
            ) : (
                <div className="mobile-header-spacing">
                    <div className="container-responsive">
                        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
                            <h1 className="text-responsive-xl font-bold text-center lg:text-left mb-4 lg:mb-0">
                                Special Products
                            </h1>

                            <Link
                                to="/shop"
                                className="bg-blue-600 text-white font-bold rounded-full py-2 px-6 lg:px-10 hover:bg-blue-700 transition-colors"
                            >
                                Shop Now
                            </Link>
                        </div>

                        <div className="grid-responsive">
                            {data.products.map((product) => (
                                <div key={product._id} className="product-card">
                                    <Product product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home
