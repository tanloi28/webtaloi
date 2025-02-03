import { DeleteOutlined, DiffOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, message, Popconfirm, Table, TableColumnsType } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';
import { ICategory } from '../../interfaces/Category';
import instance from '../../apis';



const Product = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [categories, setCategories] = useState<ICategory[]>([] as ICategory[]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { state, handleRemoveCate} = useContext(CategoryContext)
    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const { data } = await instance.get("/categories");
            setCategories(data?.data);
        } catch (err) {
            setIsError(true);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, [state.categories]);
      
    const dataSource = state.categories?.map((category: ICategory) => ({
        key: category._id,
        ...category
    }));
    const columns: TableColumnsType<ICategory> = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            
        },
        {
            key: 'slug',
            title: 'Slug',
            dataIndex: 'slug',
        },
      
        
        {
            key: "state",
            render: (text: string, category: ICategory) => {
                return (
                    <div className='flex space-x-3'>
                    {}
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn đã chắc chắn chưa?"
                            onConfirm={() => handleRemoveCate(category._id!)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >

                            <Button danger>
                            <DeleteOutlined /> Delete
                            </Button>
                        </Popconfirm>
                        <Button className=''>
                                <Link to={`/admin/category/edit/${category._id}`}>
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
                <h1 className='text-2xl font-semibold'>Quản lý danh muc</h1>
                <Button type='primary'>
                    <Link to={`/admin/category-add`}>
                        <PlusCircleFilled className='mr-2' />
                        Thêm danh muc
                    </Link>
                </Button>
            </div>
            <Table dataSource={dataSource} columns={columns} rowKey="_id" />
        </>
    );
};

export default Product;
