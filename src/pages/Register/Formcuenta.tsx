import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import FormEmail from './FormEmail';
import FormContraseña from './FormContraseña';
import FormNombres from './FormNombres';
import FormTelefono from './FormTelefono';
import { FormValues } from './types';
import FormEmailVal from './FormEmailVal';
import FormTelefonoVal from './FormTelefonoVal';
import "../styles/css/formCuenta.css"

interface FormState {
  showEmailForm: boolean;
  showNombresForm: boolean;
  showTelefonoForm: boolean;
  showContraseñaForm: boolean;
  showValidacionEmailForm: boolean;
  showValidationTelefonoForm: boolean;
}


const initialFormState: FormState = {
  showEmailForm: false,
  showNombresForm: false,
  showTelefonoForm: false,
  showContraseñaForm: false,
  showValidacionEmailForm: false,
  showValidationTelefonoForm: false,
}



function Formcuenta() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [emailValidado, setEmailValidado] = useState<boolean>(false);
  const [nombresValidos, setNombresValidos] = useState<boolean>(false);
  const [telefonoValidado, setTelefonoValidado] = useState<boolean>(false);
  const [contraseñaValida, setContraseñaValida] = useState<boolean>(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormValues>({
    email:'',
    telefono: '',
    contraseña: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    usuario: '',
    confirmPassword: '',
    aceptoTerminos: false,
    aceptoContacto: false
  })

  const handleShowMenu = () => {
    setFormState({
      ...initialFormState,
      showEmailForm: false,
      showNombresForm: false,
      showTelefonoForm: false,
      showContraseñaForm: false,
      showValidacionEmailForm: false,
      showValidationTelefonoForm: false,
    })
  }

  const handleShowEmailForm = () => {
    setFormState({
      ...initialFormState,
      showEmailForm: true,
    });
  }

  const handleShowValidacionEmailForm = () => {
    setFormState({
      ...initialFormState,
      showValidacionEmailForm: true,
    })
    setEmailValidado(true);
    setNombresValidos(true);
  }

  const handleShowNombresForm = () => {
    setFormState({
      ...initialFormState,
      showNombresForm: true,
    });
  }

  const handleShowTelefonoForm = () => {
    setFormState({
      ...initialFormState,
      showTelefonoForm: true,
    })
  }

  const handleShowValidacionTelefonoForm = () => {
    setFormState({
      ...initialFormState,
      showValidationTelefonoForm: true,
    })
    setTelefonoValidado(false);
    setContraseñaValida(true);
  }

  const handleShowContraseñaForm = () => {
    setFormState ({
      ...initialFormState,
      showContraseñaForm: true,
    })
  }
  
  const handleInputChange = (fieldName: keyof FormValues, value: string | boolean) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  }

  const handleCloseFormCuenta = () => {
    navigate('/')
  }

  const handleCloseForm = () => {
    setFormState(initialFormState);
  }

  if (emailValidado) {
    console.log(formData);
  }

  return (
    <div className="contenedor-formcuenta d-flex justify-content-center align-items-center">
      <div className="row register justify-content-center me-5">
        <div className="d-flex justify-content-end mb-3">
          <button 
          className="btn-close bg-warning mt-2"
          onClick={handleCloseFormCuenta}></button>
        </div>  
        <div className="col-md-4 d-flex justify-content-center">
          <img src="https://th.bing.com/th/id/OIG2.Ca4kbNPZdUP37sJLUw5t?w=270&h=270&c=6&r=0&o=5&pid=ImgGn" className="img-thumbnail mb-4" alt="Logo" />
        </div>
        <div className="col-4 w-100 ">
          {formState.showValidationTelefonoForm && <FormTelefonoVal handleShowMenu={handleShowMenu} />}
          {formState.showValidacionEmailForm && <FormEmailVal handleShowMenu={handleShowMenu} /> }
          {formState.showEmailForm && <FormEmail formData={formData} handleInputChange={handleInputChange} handleCloseForm = {handleCloseForm} handleShowValidacionEmailForm = {handleShowValidacionEmailForm} />}
          {formState.showNombresForm && <FormNombres formData={formData} handleInputChange={handleInputChange} handleCloseForm = {handleCloseForm} handleShowMenu={handleShowMenu} setNombresValidos={setNombresValidos} setTelefonoValidado={setTelefonoValidado} />}
          {formState.showTelefonoForm && <FormTelefono formData={formData} handleInputChange={handleInputChange} handleCloseForm = {handleCloseForm} handleShowValidacionTelefonoForm={handleShowValidacionTelefonoForm} />}
          {formState.showContraseñaForm && <FormContraseña formData={formData} handleInputChange={handleInputChange} handleCloseForm = {handleCloseForm} handleShowMenu={handleShowMenu} setContraseñaValida={setContraseñaValida} />}
          {!formState.showEmailForm && !formState.showNombresForm && !formState.showTelefonoForm && !formState.showContraseñaForm && !formState.showValidacionEmailForm && !formState.showValidationTelefonoForm &&  (
            <ul className="list-unstyled">
              <div className='row'>                              
                <div className="h4 text-center mb-4 text-white">
                  Completa los datos para crear tu cuenta
                </div>
              </div>              
              <li className="d-flex justify-content-between align-items-center mb-3 text-white">
                <label>Agrega tu E-mail:</label>
                <button 
                  className="btn btn-warning" 
                  style={{minWidth: "100px"}} 
                  onClick={handleShowEmailForm}
                  disabled={emailValidado}
                  >
                  {emailValidado ? "Validado" : "Agregar"}
                </button>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3 text-white">
                <label>Elige tu nombre:</label>
                <button 
                    className="btn btn-warning" 
                    style={{minWidth: "100px"}} 
                    onClick={handleShowNombresForm}
                    disabled={!nombresValidos}
                  >
                  {nombresValidos? "Agregar":"Validado"}

                  </button>
              </li>
              <li className="d-flex justify-content-between align-items-center mb-3 text-white">
                <label>Registrar telefono:</label>
                <button 
                  className="btn btn-warning" 
                  style={{minWidth: "100px"}} 
                  onClick={handleShowTelefonoForm}
                  disabled={!telefonoValidado}
                  >
                  {telefonoValidado? "Validar": "Validado"}

                  </button>
              </li>
              <li className="d-flex justify-content-between align-items-center text-white">
                <label>Crear contraseña:</label>
                <button 
                  className="btn btn-warning" 
                  style={{minWidth: "100px"}} 
                  onClick={handleShowContraseñaForm}
                  disabled={!contraseñaValida}
                  >
                  {contraseñaValida? "Crear": "Validado"}
                  </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="col-md-6" style={{width:"500px" ,height: "auto" }}>
        <img src="https://th.bing.com/th/id/OIG3.J7La_qQtQ0Yo2hcZYHob?pid=ImgGn" className="img-fluid mt-5" alt="dad" />
      </div>
    </div>
  );
}

export default Formcuenta;
