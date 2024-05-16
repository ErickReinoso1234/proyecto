import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

interface FormValues {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  cedula: string;
}

const PerfilUsuario: React.FC = () => {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);

  const onFinish = (values: FormValues) => {
    console.log('Received values:', values);
    setEditable(true);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Perfil de Usuario</h1>
      <Form
        form={form}
        name="perfil"
        onFinish={onFinish}
        initialValues={{
          nombres: 'Juan',
          apellidos: 'Pérez',
          email: 'juan@example.com',
          telefono: '123456789',
          cedula: '1234567890'
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Nombres"
          name="nombres"
          rules={[{ required: true, message: 'Por favor ingresa tus nombres' }]}
        >
          <Input disabled={!editable} />
        </Form.Item>

        <Form.Item
          label="Apellidos"
          name="apellidos"
          rules={[{ required: true, message: 'Por favor ingresa tus apellidos' }]}
        >
          <Input disabled={!editable} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Por favor ingresa tu email' }]}
        >
          <Input type="email" disabled={!editable} />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="telefono"
          rules={[{ required: true, message: 'Por favor ingresa tu número de teléfono' }]}
        >
          <Input type="tel" disabled={!editable} />
        </Form.Item>

        <Form.Item
          label="Cédula"
          name="cedula"
          rules={[{ required: true, message: 'Por favor ingresa tu número de cédula' }]}
        >
          <Input disabled={!editable} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          {editable ? (
            <Button 
              type="primary" 
              htmlType="submit" 
              onClick={() => setEditable(false)}
              icon={<SaveOutlined />}>
              Guardar
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => setEditable(true)}
              icon={<EditOutlined />}
            >
              Editar
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default PerfilUsuario;
