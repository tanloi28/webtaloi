import { BackwardFilled } from '@ant-design/icons';
import { Button, Form, FormProps, Input } from 'antd';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';
import { ICategory } from '../../interfaces/Category';


const AddCategory = () => {
  const nav = useNavigate()
  const { handleAddCategory } = useContext(CategoryContext)
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await instance.get(`/categories`)
  //       setCategories(data?.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchCategories()
  // }, [])
  const onFinishFailed: FormProps<ICategory>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = async (values: ICategory) => {
    const category: ICategory = {
      ...values,
    };
    try {
      await handleAddCategory(category);
      nav('/admin/category'); 
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between mb5">
        <h1 className='text-2xl font-semibold'>Thêm danh muc</h1>
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

export default AddCategory;
