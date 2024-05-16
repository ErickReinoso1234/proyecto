import React, {useState} from "react";

interface FormTelefonoValProps {
  handleShowMenu: () => void;
}

function FormTelefonoVal ({handleShowMenu}: FormTelefonoValProps) {
    const [telefonoError, setTelefonoError] = useState("");

    const handleSubmitCodigoVerificacion = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setTelefonoError("");
      handleShowMenu();
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