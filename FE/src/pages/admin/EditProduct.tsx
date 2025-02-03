import { BackwardFilled } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Select } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../../interfaces/Product';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { ICategory } from '../../interfaces/Category';
import { useQuery } from '@tanstack/react-query';
import instance from '../../apis';


const EditProduct = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { handleEditProduct } = useContext(ProductContext)
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await instance.get(`/categories`)
        setCategories(data?.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])

  const onFinishFailed: FormProps<IProduct>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = async (values: IProduct) => {
    const product: IProduct = {
      ...values,
      _id: id,
      categoryId: values.categoryId 
    };
    try {
      await handleEditProduct(product);
      nav('/admin/product'); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
        try {
            const response = await instance.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Lay san pham that bai")
        }
    }
  })
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>{error.message}</div>
  console.log(data?.data)
  return (
    <>
      <div className="flex items-center justify-between mb5">
        <h1 className='text-2xl font-semibold'>Sửa sản phẩm</h1>
        <Button type='primary'>
          <Link to={`/admin/product`}>
            <BackwardFilled className='mr-2' />
            Quay về
          </Link>
        </Button>
      </div>
      <div className="max-w-4xl mx-auto">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{...data?.data}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<IProduct>
            label="Tên sản phẩm"
            name="title"
            rules={[{ required: true, message: 'Không được bỏ trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IProduct>
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Không được bỏ trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IProduct>
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Không được bỏ trống!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item<IProduct>
            label="Ảnh"
            name="image"
            rules={[{ required: true, message: 'Không được bỏ trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Danh muc" name="categoryId" rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
            <Select>
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default EditProduct;
