import React, {useState} from "react";

interface FormEmailValProps {
    handleShowMenu: () => void;
  }

function FormEmailVal ({handleShowMenu}:FormEmailValProps) {
    const [emailError, setEmailError] = useState("");
    const handleEmailCodigoValidacion = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailError("");
        handleShowMenu();
    }

    return (        
            <form onSubmit={handleEmailCodigoValidacion}>
              <div className="form-group">
                <label className="text-white">Te hemos enviado un codigo de verificacion al correo registrado</label><br/>
                <label htmlFor="verification-code" className="text-white">Ingrese el código de verificación:</label><br/><br/>
                <input 
                type="text" 
                className="form-control mb-2" 
                id="verification-code" 
                name="verification-code" 
                required 
                />
                {emailError && <div className="text-danger">(emailError)</div>}
                <button type="submit" className="btn btn-warning mb-2">Verificar Código</button>
              </div>
            </form>
    )
}

export default  FormEmailVal;