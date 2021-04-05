import { Modal, Form, Input, InputNumber, Divider } from 'antd';

const NewAirplaneForm = ({ visible, onCreate, onCancel }) => {
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
        name="newAirplane"
      >
        <Form.Item
          name="model"
          label="Модель самолёта: "
          rules={[
            {
              required: true,
              message: 'Введите модель самолёта!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item
          name="crew"
          label="Количество экипажа: "
          rules={[
            {
              required: true,
              message: 'Введите количество экипажа!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="passengers"
          label="Количество пассажиров: "
          rules={[
            {
              required: true,
              message: 'Введите количество пассажиров!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="boardNumber"
          label="Номер борта: "
          rules={[
            {
              required: true,
              message: 'Введите номер борта!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="MFR"
          label="Максимальная дальность полёта: "
          rules={[
            {
              required: true,
              message: 'Введите максимальную дальность полёта!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="maximumSpeed"
          label="Максимальная скорость: "
          rules={[
            {
              required: true,
              message: 'Введите максимальную скорость!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="numberOfEngines"
          label="Количество двигателей: "
          rules={[
            {
              required: true,
              message: 'Введите количество двигателей!',
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewAirplaneForm;
