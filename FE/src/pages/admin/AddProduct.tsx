import { BackwardFilled } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/Product';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { ICategory } from '../../interfaces/Category';
import instance from '../../apis';
const AddProduct = () => {
  const nav = useNavigate()
  const { handleAddProduct } = useContext(ProductContext)
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
      categoryId: values.categoryId 
    };
    try {
      await handleAddProduct(product);
      nav('/admin/product'); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between mb5">
        <h1 className='text-2xl font-semibold'>Thêm sản phẩm</h1>
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
          initialValues={{ remember: true }}
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

export default AddProduct;
