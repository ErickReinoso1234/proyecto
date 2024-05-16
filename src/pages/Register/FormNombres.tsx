import React, { useState } from 'react';
import { FormValues } from './types';

interface FormNombresProps {
    formData: FormValues;
    handleInputChange: (fieldName: keyof FormValues, value: string | boolean) => void;
    handleCloseForm?: () => void;
    handleShowMenu: () => void;
    setNombresValidos: React.Dispatch<React.SetStateAction<boolean>>;
    setTelefonoValidado: React.Dispatch<React.SetStateAction<boolean>>;
  }

function FormNombres ({ formData, handleInputChange, handleCloseForm, handleShowMenu, setNombresValidos, setTelefonoValidado }: FormNombresProps) {
    const [usuarioError, setUsuarioError] = useState('');
    const [cedulaError, setCedulaError] = useState ('');

    
    const handleSubmitNombres = (event: React.FormEvent<HTMLFormElement>)=> {
      event.preventDefault();

      if (formData.nombres === "" || formData.apellidos === "" || formData.cedula === "" || formData.usuario === "") {
        setUsuarioError("Todos los campos son requeridos");
        return;
      } else {
        setUsuarioError("");
      }

      if (!/^\d{10}$/.test(formData.cedula)) {
        setCedulaError("El número de cédula debe tener 10 dígitos");
        return;
      } else {
        setCedulaError("");
        handleShowMenu();
        setNombresValidos(false);
        setTelefonoValidado(true);
      }
    }



    return (
        <form onSubmit={handleSubmitNombres}>
              <div className="form-group">           
                <label htmlFor="nombres" className="h5 text-white mt-2">Elige cómo quieres que te llamemos</label>                
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="nombre" className="form-label text-white">Nombre</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="nombre" 
                  value={formData.nombres} 
                  onChange={(e) => handleInputChange('nombres', e.target.value )} 
                />
                  {formData.nombres === '' && (
                    <div className="text-danger">Nombre es requerido</div>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="apellido" className="form-label text-white">Apellido</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="apellido" 
                  value={formData.apellidos} 
                  onChange={(e) => handleInputChange('apellidos', e.target.value )} 
                />
                  {formData.apellidos === '' && (
                    <div className="text-danger">Apellido es requerido</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="cedula" className="form-label text-white">Número de Cédula</label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="cedula" 
                  value={formData.cedula} 
                  onChange={(e) => handleInputChange('cedula', e.target.value )} 
                />
                {cedulaError && <div className="text-danger">{cedulaError}</div> }
                </div>
                <div className="col">
                  <label htmlFor="validationCustomUsername" className="form-label text-white">Nombre de usuario</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="validationCustomUsername" 
                    value={formData.usuario} 
                    onChange={(e) => handleInputChange('usuario', e.target.value )} 
                    aria-describedby="inputGroupPrepend" 
                  />
                  {usuarioError && <div className="text-danger">{usuarioError}</div> }
                  </div>
                </div>
              </div>
              <button 
                className="btn bg-warning mb-2 me-3"
                onClick={handleCloseForm}> 
                Regresar
              </button>
              <button type="submit" className="btn btn-warning mb-2">Guardar</button>
            </form>
    )
}

export default FormNombres;