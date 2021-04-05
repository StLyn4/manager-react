import { Modal, Form, Input, InputNumber, Divider } from 'antd';

const NewStudentForm = ({ visible, onCreate, onCancel }) => {
  const [ form ] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Создание записи о новом самолёте"
      okText="Создать запись"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Form validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="newStudent"
      >
        <Form.Item
          name="name"
          label="ФИО: "
          rules={[
            {
              required: true,
              message: 'Введите ФИО!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="group"
          label="Группа: "
          rules={[
            {
              required: true,
              message: 'Введите название группы!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item
          name="course"
          label="Курс: "
          rules={[
            {
              required: true,
              message: 'Введите курс!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="bookNumber"
          label="Номер зачётной книжки: "
          rules={[
            {
              required: true,
              message: 'Введите номер зачётной книжки!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="ukrLang"
          label="Оценка с украинского языка: "
          rules={[
            {
              required: true,
              message: 'Введите оценку с украинского языка!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="pe"
          label="Оценка с физ. культуры: "
          rules={[
            {
              required: true,
              message: 'Введите оценку с физ. культуры!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="engLang"
          label="Оценка с английского языка: "
          rules={[
            {
              required: true,
              message: 'Введите оценку с английского языка!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewStudentForm;
