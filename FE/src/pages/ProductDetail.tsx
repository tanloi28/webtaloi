import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../interfaces/Product';
import { toast, ToastContainer } from 'react-toastify';
import { ProductContext } from '../contexts/ProductContext';
import useLocalStorage from '../hooks/useStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import instance from '../apis';


const ProductDetail = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const userId = user?._id;
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const { state } = useContext(ProductContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await instance.get(`/products/${id}`);
                setProduct(data.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    // Log để kiểm tra userId
    useEffect(() => {
        console.log("User ID:", userId);
    }, [userId]);

    const { mutate } = useMutation({
        mutationFn: async ({ productId, quantity }: { productId: string, quantity: number }) => {
            if (!userId) {
                throw new Error("User ID is missing");
            }
            const { data } = await instance.post(`/cart/add-to-cart`, {
                userId,
                productId,
                quantity
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart", userId]
            });
            toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
        },
        onError: () => {
            toast.error("Thêm sản phẩm vào giỏ hàng thất bại!. Vui lòng thử lại.");
        },
    });

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Chi tiết sản phẩm</h1>
            <div className="row">
                <div className="col-12 col-md-6">
                    <img src={product.image} alt="" />
                </div>
                <div className="col-12 col-md-6">
                    <h1>{product.title}</h1>
                    <p>Giá: {product.price}</p>
                    <p>{product.description}</p>
                    <button className='btn btn-primary' onClick={() =>
                        mutate({ productId: product._id!, quantity: 1 })}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductDetail;