import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../Redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../Redux/api/categoryApiSlice";

import {
    setCategories,
    setProducts,
    setChecked,
} from "../Redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./products/ProductCard";

const Shop = () => {
    const dispatch = useDispatch();
    const { categories, products, checked, radio } = useSelector(
        (state) => state.shop
    );

    const categoriesQuery = useFetchCategoriesQuery();
    const [priceFilter, setPriceFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio,
    });

    useEffect(() => {
        if (!categoriesQuery.isLoading) {
            dispatch(setCategories(categoriesQuery.data));
        }
    }, [categoriesQuery.data, dispatch]);

    useEffect(() => {
        if (!checked.length || !radio.length) {
            if (!filteredProductsQuery.isLoading) {
                const filteredProducts = filteredProductsQuery.data.filter(
                    (product) => {
                        return (
                            product.price.toString().includes(priceFilter) ||
                            product.price === parseInt(priceFilter, 10)
                        );
                    }
                );

                dispatch(setProducts(filteredProducts));
            }
        }
    }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

    const handleBrandClick = (brand) => {
        const productsByBrand = filteredProductsQuery.data?.filter(
            (product) => product.brand === brand
        );
        dispatch(setProducts(productsByBrand));
    };

    const handleCheck = (value, id) => {
        const updatedChecked = value
            ? [...checked, id]
            : checked.filter((c) => c !== id);
        dispatch(setChecked(updatedChecked));
    };

    const uniqueBrands = [
        ...Array.from(
            new Set(
                filteredProductsQuery.data
                    ?.map((product) => product.brand)
                    .filter((brand) => brand !== undefined)
            )
        ),
    ];

    const handlePriceChange = (e) => {
        setPriceFilter(e.target.value);
    };

    return (
        <>
            <div className="mobile-header-spacing">
                <div className="container-responsive">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Filters Sidebar */}
                        <div className="w-full lg:w-80">
                            {/* Mobile Filter Toggle */}
                            <div className="lg:hidden mb-4">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="w-full bg-gray-800 text-white p-3 rounded-lg flex items-center justify-between"
                                >
                                    <span>Filters</span>
                                    <span>{showFilters ? '' : '+'}</span>
                                </button>
                            </div>

                            {/* Filter Content */}
                            <div className={${showFilters ? 'block' : 'hidden'} lg:block p-4 lg:p-6 shadow-lg bg-white rounded-lg}>
                                <h2 className="text-lg font-bold mb-4 text-center">Filter by Categories</h2>
                                <div className="space-y-3 mb-6">
                                    {categories?.map((c) => (
                                        <div key={c._id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={category-}
                                                onChange={(e) => handleCheck(e.target.checked, c._id)}
                                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor={category-}
                                                className="ml-3 text-sm font-medium text-gray-700"
                                            >
                                                {c.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <h2 className="text-lg font-bold mb-4 text-center">Filter by Brands</h2>
                                <div className="space-y-3 mb-6">
                                    {uniqueBrands?.map((brand) => (
                                        <div key={brand} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={rand-}
                                                name="brand"
                                                onChange={() => handleBrandClick(brand)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor={rand-}
                                                className="ml-2 text-sm font-medium text-gray-700"
                                            >
                                                {brand}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <h2 className="text-lg font-bold mb-4 text-center">Filter by Price</h2>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        placeholder="Enter Price"
                                        value={priceFilter}
                                        onChange={handlePriceChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                    className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                    onClick={() => window.location.reload()}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="flex-1">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-center lg:text-left">
                                    {products?.length} Products Found
                                </h2>
                            </div>
                            
                            {products.length === 0 ? (
                                <Loader />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                                    {products?.map((p) => (
                                        <div key={p._id} className="w-full">
                                            <ProductCard p={p} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;
