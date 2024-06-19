import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormValues } from './types';

interface FormContraseñaProps {
  formData: FormValues;
  handleInputChange: (fieldName: keyof FormValues, value: string | boolean) => void;
  handleCloseForm?: () => void;
  setContraseñaValida: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormContraseña({ formData, handleInputChange, handleCloseForm, setContraseñaValida }: FormContraseñaProps) {
  const [contraseñaError, setContraseñaError] = useState('');
  const navigate = useNavigate();

  const handleSubmitContraseña = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!contraseñaRegex.test(formData.contraseña)) {
      setContraseñaError('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula y un número');
      return;
    }

    if (formData.contraseña !== formData.confirmPassword) {
      setContraseñaError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/usuarios/crear_cuenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombres,
          apellido: formData.apellidos,
          nombre_usuario: formData.usuario,
          cedula: formData.cedula,
          email: formData.email,
          telefono: formData.telefono,
          contraseña: formData.contraseña,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setContraseñaValida(true);
        alert('¡Cuenta creada con éxito!');
        navigate("/login");
      } else {
        setContraseñaError(data.error || "Error al crear la cuenta. Inténtalo de nuevo.");
      }
    } catch (error) {
      setContraseñaError("Error al verificar el correo: " + error);
    }
  };

  return (
    <Form onSubmit={handleSubmitContraseña}>
      <div className="form-group">
        <label htmlFor="contraseña" className="h5 text-white">
          Crear contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={(e) => handleInputChange('contraseña', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword" className="h5 text-white">Confirmar contraseña</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        />
        {contraseñaError && <div className="text-danger">{contraseñaError}</div>}
      </div>
      <button
        className="btn bg-warning mb-2 me-3"
        onClick={handleCloseForm}>
        Regresar
      </button>
      <button type="submit" className="btn btn-warning mb-2">
        Crear cuenta
      </button>
    </Form>
  );
}

export default FormContraseña;
