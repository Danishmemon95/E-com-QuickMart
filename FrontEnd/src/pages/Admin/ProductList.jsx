import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from "../../Redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../Redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("image", image);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("brand", brand);
            productData.append("countInStock", stock);

            const { data } = await createProduct(productData);

            if (data.error) {
                toast.error("Product create failed. Try Again.");
            } else {
                toast.success(`${data.name} is created`);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            toast.error("Product create failed. Try Again.");
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <AdminMenu />
            <div className="container max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 transform transition-all hover:shadow-3xl">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
                    Add New Product
                </h1>
                <div className="space-y-8">
                    {/* Image Preview */}
                    {imageUrl ? (
                        <div className="relative flex justify-center group">
                            <img
                                src={imageUrl}
                                alt="product"
                                className="max-h-80 rounded-2xl shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 rounded-2xl transition-opacity duration-300"></div>
                        </div>
                    ) : (
                        <div className="relative">
                            <label className="block w-full text-center rounded-xl cursor-pointer font-semibold py-5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-sm border border-gray-200">
                                <span className="text-gray-700">{image ? image.name : "Upload Product Image"}</span>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={uploadFileHandler}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="relative">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name"
                            />
                        </div>

                        {/* Price */}
                        <div className="relative">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                Price
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">$</span>
                                <input
                                    type="number"
                                    className="w-full p-4 pl-8 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="relative">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <input
                                type="number"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Enter quantity"
                            />
                        </div>

                        {/* Brand */}
                        <div className="relative">
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                                Brand
                            </label>
                            <input
                                type="text"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                placeholder="Enter brand"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            className="w-full h-[5rem] p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm resize-none"
                            rows="6"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your product..."
                        ></textarea>
                    </div>

                    {/* Stock and Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Count In Stock */}
                        <div className="relative">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                                Count In Stock
                            </label>
                            <input
                                type="number"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Enter stock count"
                            />
                        </div>

                        {/* Category */}
                        <div className="relative">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm appearance-none"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="">Select Category</option>
                                {categories?.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex mt-[12%]  pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleSubmit}
                            className="py-4 px-10 rounded-xl text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Create Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;