export default function (values) {
  let errors = {};
  const onlyText = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
  const onlyNumber = /^\d+$/;
  const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const fechalimite = new Date().getTime();

  if (!values.firstName.trim()) {
    errors.firstName = "Primer nombre requerido";
  } else if (!onlyText.test(values.firstName)) {
    errors.firstName = "Debes ingresar solo letras";
  }

  if (values.secondName.trim() && !onlyText.test(values.secondName)) {
    errors.secondName = "Debes ingresar solo letras";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Primer apellido requerido";
  } else if (!onlyText.test(values.lastName)) {
    errors.lastName = "Debes ingresar solo letras";
  }

  if (values.secondLastName.trim() && !onlyText.test(values.secondLastName)) {
    errors.secondLastName = "Debes ingresar solo letras";
  }

  if (values.marriedName.trim() && !onlyText.test(values.marriedName)) {
    errors.marriedName = "Debes ingresar solo letras";
  }

  if (!values.bornDate.trim()) {
    errors.bornDate = "La fecha de nacimiento es requerida";
  } else if (new Date(values.bornDate).getTime() > fechalimite) {
    errors.bornDate = "La fecha de nacimiento es mayor a la actual";
  }

  if(values.mobilePhone.trim() && !onlyNumber.test(values.mobilePhone)) {
    errors.mobilePhone = "Debes ingresar solo numeros";
  } 

  if (values.email.trim() && !validEmail.test(values.email)) {
      errors.email = "El email ingresado no es valido";
  }

  if (values.uuidReligion === "" || values.uuidReligion === "0") {
    errors.uuidReligion = "La religión es requerida";
  }

  if (values.gender === "" || values.gender === "0") {
    errors.gender = "El género es requerido";
  }
  return errors;
}
