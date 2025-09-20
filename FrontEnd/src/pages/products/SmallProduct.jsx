import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
    return (
        <div className="w-[75%] ml-[1rem] p-3">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded h-[17rem] w-[17rem]"
                />
                <HeartIcon product={product} />
            </div>

            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className="flex justify-between items-center">
                        <div className="font-medium">{product.name}</div>
                        <span className="bg-blue-100 text-blue-900 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                            ${product.price}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    );
};

export default SmallProduct;