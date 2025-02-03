import { BackwardFilled } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, FormProps, Input } from 'antd';
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';
import { ICategory } from '../../interfaces/Category';
import instance from '../../apis';


const EditCategory = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { handleEditCategory } = useContext(CategoryContext)
  const onFinishFailed: FormProps<ICategory>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = async (values: ICategory) => {
    const category: ICategory = {
      ...values,
      _id: id,
    };
    try {
      await handleEditCategory(category);
      nav('/admin/category'); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
        try {
            const response = await instance.get(`/categories/${id}`);
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
        <h1 className='text-2xl font-semibold'>Sửa danh muc</h1>
        <Button type='primary'>
          <Link to={`/admin/category`}>
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
          <Form.Item<ICategory>
            label="Ten danh muc"
            name="name"
            rules={[{ required: true, message: 'Không được bỏ trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ICategory>
            label="Slug"
            name="slug"
            rules={[{ required: true, message: 'Không được bỏ trống!' }]}
          >
            <Input />
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

export default EditCategory;
