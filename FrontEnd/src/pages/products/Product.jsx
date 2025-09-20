import React from 'react'
import { Link } from "react-router-dom";
import HeartIcon from './HeartIcon';

const Product = ({ product }) => {
    return (
        <div className="w-full max-w-sm mx-auto p-3 relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-t-lg"
                />
                <HeartIcon product={product} />
            </div>

            <div className="p-4">
                <Link to={/product/}>
                    <h2 className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="text-lg font-medium text-gray-900 line-clamp-2">{product.name}</div>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            $ {product.price}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    );
}

export default Product
