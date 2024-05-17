import React, {useState} from "react";
import { Form } from 'react-bootstrap';
import { FormValues } from './types';
import { useNavigate } from "react-router-dom";

interface FormContraseñaProps {
  formData: FormValues;
  handleInputChange: (fieldName: keyof FormValues, value: string | boolean) => void;
  handleCloseForm?: () => void;
  setContraseñaValida: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowMenu: () => void;
}

function FormContraseña ({formData, handleInputChange, handleCloseForm, handleShowMenu, setContraseñaValida }: FormContraseñaProps) {
  const [contraseñaError, setContraseñaError] = useState('');
  const navigate = useNavigate();

  const handleSubmitContraseña = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
    if (!contraseñaRegex.test(formData.contraseña)) {
      setContraseñaError('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula y un número');
      return;
    }
    if (formData.contraseña !== formData.confirmPassword) {
      setContraseñaError('Las contraseñas no coinciden');
      return;
    } else {
      setContraseñaError("");
      setContraseñaValida(true);
      alert('¡Cuenta creada con éxito!');
      navigate("/login");
    }
  };

    return (
        <Form onSubmit={handleSubmitContraseña}>
            <div className="form-group">
                <label htmlFor="password" className="h5 text-white">
                    Crear contraseña
                </label>
                <input 
                type="password" 
                className="form-control" 
                id="contraseña" 
                placeholder="Contraseña" 
                value={formData.contraseña} 
                onChange={(e) => handleInputChange('contraseña', e.target.value )} 
                />
            </div>
            <label className="form-check-label text-black" htmlFor="invalidCheck">
                Al menos una letra mayúscula y una minúscula               
            </label>
            <div className="form-group">
                <label htmlFor="confirmPassword" className="h5 text-white">Confirmar contraseña</label>
                <input 
                type="password" 
                className="form-control" 
                id="confirmPassword" 
                placeholder="Confirmar Contraseña"
                value={formData.confirmPassword} 
                onChange={(e) => handleInputChange('confirmPassword', e.target.value )} 
                />
                <br />
                {contraseñaError && <div className="text-danger">{contraseñaError}</div> }
                <br />
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
    )
}

export default  FormContraseña;