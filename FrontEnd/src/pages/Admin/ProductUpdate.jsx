import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from "../../Redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../Redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductUpdate = () => {
    const params = useParams();

    const { data: productData } = useGetProductByIdQuery(params._id);

    console.log(productData);

    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(
        productData?.description || ""
    );
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock);

    const navigate = useNavigate();
    const { data: categories = [] } = useFetchCategoriesQuery();

    const [uploadProductImage] = useUploadProductImageMutation();

    // Define the update product mutation
    const [updateProduct] = useUpdateProductMutation();

    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category?._id);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);
        }
    }, [productData]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success("Image uploaded successfully");
            setImage(res.image);
        } catch (err) {
            toast.error("Image upload failed. Try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("brand", brand);
            formData.append("countInStock", stock);

            const { data } = await updateProduct({ productId: params._id, formData });

            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`Product successfully updated`);
                navigate("/admin/allproductslist");
            }
        } catch (err) {
            console.log(err);
            toast.error("Product update failed. Try again.");
        }
    };

    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are you sure you want to delete this product?");
            if (!answer) return;

            const { data } = await deleteProduct(params._id).unwrap();
            toast.success(`"${data.name}" is deleted`);
            navigate("/admin/allproductslist");
        } catch (err) {
            console.error(err);
            toast.error("Delete failed. Try again.");
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 transform transition-all hover:shadow-3xl">
                <div className="flex flex-col justify-center lg:flex-row gap-8">
                    {/* Admin Menu */}
                    <AdminMenu />

                    {/* Main Form Section */}
                    <div className="lg:w-3/4">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
                            Update / Delete Product
                        </h1>

                        {/* Image Preview */}
                        {image && (
                            <div className="mb-6 flex justify-center">
                                <img
                                    src={image}
                                    alt="product"
                                    className="max-h-80 w-full rounded-2xl shadow-lg object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}

                        {/* Image Upload */}
                        <div className="mb-6">
                            <label className="block w-full text-center rounded-xl cursor-pointer font-semibold py-5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-sm border border-gray-200">
                                <span className="text-gray-700">{image ? image.name || "Image Selected" : "Upload Product Image"}</span>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={uploadFileHandler}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
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
                                        required
                                    />
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Enter quantity"
                                    required
                                />
                            </div>

                            {/* Brand */}
                            <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    placeholder="Enter brand"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm resize-none"
                                rows="6"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your product..."
                                required
                            ></textarea>
                        </div>

                        {/* Stock and Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Count In Stock */}
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                                    Count In Stock
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="Enter stock count"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div className="relative">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 hover:bg-white shadow-sm appearance-none"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-10 flex justify-center space-x-4">
                            <button
                                onClick={handleSubmit}
                                className="py-4 px-10 rounded-xl text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="py-4 px-10 rounded-xl text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductUpdate;