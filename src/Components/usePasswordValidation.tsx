import { useState } from "react";

export function usePasswordValidation() {
  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = (password: string): boolean => {
    const newErrors: string[] = [];

    if (password.length < 8) {
      newErrors.push("La contraseña debe tener mínimo 8 carácteres.");
    }
    if (!/\d/.test(password)) {
      newErrors.push("La contraseña debe incluir un número.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      newErrors.push("La contraseña debe incluir un caracter especial (!@#$%^&*).");
    }

    setErrors(newErrors);
    return newErrors.length === 0; //valid if there is no errors
  };

  return { errors, validatePassword };
}
