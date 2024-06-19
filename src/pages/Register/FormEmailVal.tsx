import React, { useState } from "react";
import { FormValues } from "./types";

interface FormEmailValProps {
    formData: FormValues;  
    handleShowMenu: () => void;
}

function FormEmailVal({ formData, handleShowMenu }: FormEmailValProps) {
    const [emailError, setEmailError] = useState<string>("");

    const handleEmailCodigoValidacion = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        
        const codigo_verificacion = (event.target as HTMLFormElement)['verification-code'].value;

        try {
            const response = await fetch('http://localhost:4000/usuarios/verificar_codigo_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    codigo_verificacion,
                    email: formData.email
                }),
            });

            const data = await response.json();

            if (data.success) {        
                handleShowMenu();          
            } else {
                setEmailError(`Error al verificar el código de verificación: ${data.error}`);
            }
        } catch (error) {
            setEmailError(`Error al verificar el código de verificación: ${error}`);
        }
    };

    return (
        <form onSubmit={handleEmailCodigoValidacion}>
            <div className="form-group">
                <label className="text-white">Te hemos enviado un código de verificación al correo registrado</label><br />
                <label htmlFor="verification-code" className="text-white">Ingrese el código de verificación:</label><br /><br />
                <input 
                    type="text" 
                    className="form-control mb-2" 
                    id="verification-code" 
                    name="verification-code" 
                    required 
                />
                {emailError && <div className="text-danger">{emailError}</div>}
                <button type="submit" className="btn btn-warning mb-2">Verificar Código</button>
            </div>
        </form>
    );
}

export default FormEmailVal;
