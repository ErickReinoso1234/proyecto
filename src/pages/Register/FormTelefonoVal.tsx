import React, {useState} from "react";
import { FormValues } from "./types";

interface FormTelefonoValProps {
  formData: FormValues;
  handleShowMenu: () => void;
}

function FormTelefonoVal ({formData, handleShowMenu}: FormTelefonoValProps) {
    const [telefonoError, setTelefonoError] = useState("");

    const handleSubmitCodigoVerificacion = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
       const codigo_verificacion = (event.target as HTMLFormElement)['verification-code'].value;
      try {
        const response = await fetch('http://localhost:4000/usuarios/verificar_codigo_telefono',{
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            codigo_verificacion,
            telefono: formData.telefono
          }),
        });
        const data = await response.json();

        if(data.success) {
          setTelefonoError("");
          handleShowMenu();
        }else {
          setTelefonoError(`Error al verificar el código de verificación: ${data.error}`);
        }
      }catch (error) {
        setTelefonoError(`Error al verificar el código de verificación: ${error}`);
      }
    }
    
    return (
            <form onSubmit={handleSubmitCodigoVerificacion}>
              <div className="form-group">
                <label className="text-white">Te hemos enviado un codigo de verificacion al numero celular registrado</label><br/>
                <label htmlFor="verification-code" className="text-black">Ingrese el código de verificación:</label><br/><br/>
                <input 
                type="text" 
                className="form-control" 
                id="verification-code" 
                name="verification-code" 
                required 
                /><br/>
                {telefonoError && <div className="text-danger">{telefonoError}</div>}
                <br/>
                <button type="submit" className="btn btn-warning mb-2">Verificar Código</button>
              </div>
            </form>
    )
}

export default  FormTelefonoVal;