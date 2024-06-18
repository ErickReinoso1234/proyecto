import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FormValues } from './types';

interface FormEmailProps {
  formData: FormValues;
  handleInputChange: (fieldName: keyof FormValues, value: string | boolean) => void;
  handleCloseForm?: () => void;
  handleShowValidacionEmailForm: () => void;
}

function FormEmail({ formData, handleInputChange, handleCloseForm, handleShowValidacionEmailForm }: FormEmailProps) {
  const [emailError, setEmailError] = useState<string>('');


  const validarEmail = (email: string): boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validarEmail(formData.email)) {
      setEmailError('El correo electrónico no es válido');
      return;
    } else {
      setEmailError('');
    }
    if (!formData.aceptoTerminos) {
      setEmailError('Debes aceptar los términos y condiciones');
      return;
    } else {
      setEmailError('');
      
      }

      try {
        const response = await fetch("http://localhost:4000/usuarios/verificar_correo", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: formData.email}),
        });

        const data = await response.json();
        
        if (data.error) {
          setEmailError("Este correo ya esta registrado");
          return;
        }else {
          const responseEnviarCodigo = await fetch("http://localhost:4000/usuarios/enviar_codigo_email",{
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: formData.email}),
          });
          const dataEnviarCodigo = await responseEnviarCodigo.json();
          if(dataEnviarCodigo.success) {
            handleShowValidacionEmailForm();
            setEmailError("");
          } else {
            setEmailError('Error al enviar el código de verificación. Inténtalo de nuevo más tarde.');
          }
        }
      } catch (error) {
        setEmailError("Error al verificar el correo:" + error)
      }
  };
      
  return (
    <form onSubmit={handleSubmitEmail}>
      <div className="form-group">        
        <label htmlFor="email" className="h5 text-white">
          Ingresa tu Email
        </label>
        <h5 className="h6 text-white">Asegúrate de tener acceso a él.</h5>
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        {emailError && <div className="text-danger">{emailError}</div>}
      </div>
      <Form.Group className="mb-3 form-check text-white">
        <Form.Check
          type="checkbox"
          label="Acepto los Términos y condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad."
          onChange={(e) =>handleInputChange('aceptoTerminos', e.target.checked)} 
          checked={formData.aceptoTerminos}
        />
      </Form.Group>
      <button 
        className="btn bg-warning mb-2 me-3"
        onClick={handleCloseForm}> 
        Regresar
      </button>    
      <button type="submit" className="btn btn-warning mb-2">
        Validar
      </button>
    </form>
  );
}

export default FormEmail;
