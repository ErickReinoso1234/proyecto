import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useUser } from '../../states/usuarioState';

// interface FormValues {
//   nombres: string;
//   apellidos: string;
//   email: string;
//   telefono: string;
//   cedula: string;
// }

const PerfilUsuario: React.FC = () => {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (!user || !user.id_usuario) {
        message.error('No se puede actualizar el perfil sin un ID de usuario válido.');
        return;
      }
      const updatedValues = { ...values, id: user.id_usuario };
      console.log('Received values:', values);

      const response = await fetch(`http://localhost:4000/usuarios/edit_usuario/${user.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        message.success('Perfil actualizado correctamente.');
        setEditable(false);
      } else {
        throw new Error(data.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      message.error('Error al actualizar el perfil: ' + error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Perfil de Usuario</h1>
      <Form
        form={form}
        name="perfil"
        onFinish={handleSave}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingresa tus nombres' }]}
        >
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="apellido"
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
        >
          <Input disabled={true} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          {editable ? (
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}>
              Guardar
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();  // Esto evita que el botón actúe como un botón de envío
                handleEdit();
              }}
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
