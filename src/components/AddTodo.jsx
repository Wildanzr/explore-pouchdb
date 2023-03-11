import { Input, Button, Form } from 'antd'

export default function AddTodo (props) {
  // Props destructuring
  const { handleAddElement } = props
  // Form
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    await handleAddElement(values.name)
    form.resetFields()
  }

  return (
    <Form
      form={form}
      name="add-todo"
      onFinish={onFinish}
      className="w-full flex flex-row space-x-4"
    >
      <Form.Item name={'name'} className="w-10/12">
        <Input placeholder="Write your todo here..." allowClear/>
      </Form.Item>

      <Form.Item className="w-2/12">
        <Button type="primary" htmlType="submit" className='w-full'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
