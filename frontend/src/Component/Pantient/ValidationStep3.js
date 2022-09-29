export default function validationStep3(values) {
  let errors = {};
  const onlyNumber = /^\d+$/;

  if (values.uuidCity === "" || values.uuidCity === "0") {
    errors.uuidCity = "La ciudad es requerida";
  }

  if (!values.addressLine1.trim()) {
    errors.addressLine1 = "La dirección principal es requerida";
  }

  if (values.phoneNumber.trim() && !onlyNumber.test(values.phoneNumber)) {
    errors.phoneNumber = "Solo debes ingresar numeros";
  }

  return errors;
}
