import React, {useState} from "react";
import { Form } from 'react-bootstrap';
import { FormValues } from './types';

interface FormTelefonoProps {
    formData: FormValues;
    handleInputChange: (fieldName: keyof FormValues, value: string | boolean) => void;
    handleCloseForm?: () => void;
    handleShowValidacionTelefonoForm: () => void;
  }


function FormTelefono ({formData, handleInputChange, handleCloseForm, handleShowValidacionTelefonoForm}: FormTelefonoProps) {
    const [telefonoError, setTelefonoError] = useState('');
    
    const handleSubmitTelefono = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!/^\d{9}$/.test(formData.telefono)) {
            setTelefonoError("El número de teléfono debe tener 9 dígitos numéricos");
            return;
          } else {
            setTelefonoError("");
          }

        if (!formData.aceptoContacto) {
          setTelefonoError("Debes aceptar que te contacten por WhatsApp y/o SMS");
            return;
          } else {
            setTelefonoError("");
            handleShowValidacionTelefonoForm();
          }
    }
    
    return (
        <form onSubmit={handleSubmitTelefono}>
              <div className="form-group">  
                <label htmlFor="telefono" className="h5 text-white">Ingresa tu numero de teléfono</label>
                <h5 className="h6 text-white">Te enviaremos un código por SMS para validarlo. Con este teléfono podrás iniciar sesión en tu cuenta.</h5>
                <br></br>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">+593</span>
                  <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Numero de telefono" 
                  value={formData.telefono} 
                  onChange={(e) => handleInputChange('telefono', e.target.value )} 
                  aria-label="Telefono" aria-describedby="basic-addon1" 
                  />
                </div>
                {telefonoError && <div className="text-danger">{telefonoError}</div> }
              </div>
              <Form.Group className="mb-3 form-check text-white">
                <Form.Check 
                type="checkbox" 
                label="Acepto que me contacten por WhatsApp y/o SMS a este número" 
                onChange={(e) =>handleInputChange('aceptoContacto', e.target.checked)} 
                checked={formData.aceptoContacto}
                />
              </Form.Group>
              <button 
                className="btn bg-warning mb-2 me-3"
                onClick={handleCloseForm}> 
                Regresar
              </button>
              <button type="submit" className="btn btn-warning mb-2">Guardar</button>
            </form>          
    )
}

export default FormTelefono;
