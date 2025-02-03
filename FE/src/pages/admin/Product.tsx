import { DeleteOutlined, DiffOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, message, Popconfirm, Table, TableColumnsType } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import { Category, IProduct } from '../../interfaces/Product';
import instance from '../../apis';



const Product = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [products, setProducts] = useState<IProduct[]>([] as IProduct[]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { state, handleRemove} = useContext(ProductContext)
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const { data } = await instance.get("/products");
            setProducts(data?.data);
        } catch (err) {
            setIsError(true);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, [state.products]);
      
    const dataSource = state.products?.map((product: IProduct) => ({
        key: product._id,
        ...product
    }));
    const columns: TableColumnsType<IProduct> = [
        {
            key: 'image',
            title: 'Ảnh',
            dataIndex: 'image',
            render: (image: string) => <img src={image} alt="Product" style={{ width: 50, height: 50 }} />
        },
        {
            key: 'title',
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            filters: [
                {
                  text: 'title',
                  value: 'title',
                },
            ]
        },
        {
            key: 'price',
            title: 'Giá',
            dataIndex: 'price',
            render: (price: number) => {
                if (typeof price !== 'number' || isNaN(price)) {
                  return 'Invalid price';
                }
                return `${price.toLocaleString()} VND`;
              }
              

        },
        {
            key: 'description',
            title: 'Mô tả',
            dataIndex: 'description'
        },
        {
            key: 'categoryId',
            title: 'Danh mục',
            dataIndex: 'categoryId',
            render: (category: Category) => category?.name
        },
        {
            key: "state",
            render: (text: string, product: IProduct) => {
                return (
                    <div className='flex space-x-3'>
                    {}
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn đã chắc chắn chưa?"
                            onConfirm={() => handleRemove(product._id!)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >

                            <Button danger>
                            <DeleteOutlined /> Delete
                            </Button>
                        </Popconfirm>
                        <Button className=''>
                                <Link to={`/admin/product/edit/${product._id}`}>
                                <DiffOutlined /> Update
                                </Link>
                            </Button>
                    </div>
                )
            }
        }
    ]
    return (
        <>
        {contextHolder}
            <div className="flex items-center justify-between mb5">
                <h1 className='text-2xl font-semibold'>Quản lý sản phẩm</h1>
                <Button type='primary'>
                    <Link to={`/admin/product-add`}>
                        <PlusCircleFilled className='mr-2' />
                        Thêm sản phẩm
                    </Link>
                </Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="_id" />
        </>
    );
};

export default Product;
