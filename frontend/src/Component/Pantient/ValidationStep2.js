export default function validationStep2(values) {
  let errors = {};
  const onlyText = /^[a-zA-Z√Ä-√ø\u00f1\u00d1]+(\s*[a-zA-Z√Ä-√ø\u00f1\u00d1]*)*[a-zA-Z√Ä-√ø\u00f1\u00d1]+$/
  const message = "Debes ingresar solo letras";

  if (!values.firstNameFather.trim()) {
    errors.firstNameFather = "El primer nombre del padre es requerido";
  } else if (!onlyText.test(values.firstNameFather)) {
    errors.firstNameFather = "Debes ingresar solo letras";
  }

  if (
    values.secondNameFather.trim() &&
    !onlyText.test(values.secondNameFather)
  ) {
    errors.secondNameFather = message;
  }

  if (!values.lastNameFather.trim()) {
    errors.lastNameFather = "El primer apellido del padre es requerido";
  } else if (!onlyText.test(values.lastNameFather)) {
    errors.lastNameFather = message;
  }

  if (
    values.secondLastNameFather.trim() &&
    !onlyText.test(values.secondLastNameFather)
  ) {
    errors.secondLastNameFather = message;
  }

  if (!values.firstNameMother.trim()) {
    errors.firstNameMother = "El primer nombre de la madre es requerido";
  } else if (!onlyText.test(values.firstNameMother)) {
    errors.firstNameMother = message;
  }

  if (
    values.secondNameMother.trim() &&
    !onlyText.test(values.secondNameMother)
  ) {
    errors.secondNameMother = message;
  }

  if (!values.lastNameMother.trim()) {
    errors.lastNameMother = "El primer apellido de la madre es requerido";
  } else if (!onlyText.test(values.lastNameMother)) {
    errors.lastNameMother = message;
  }

  if (
    values.secondLastNameMother.trim() &&
    !onlyText.test(values.secondLastNameMother)
  ) {
    errors.secondLastNameMother = message;
  }

  if (values.firstNameExtra.trim() && !onlyText.test(values.firstNameExtra)) {
    errors.firstNameExtra = message;
  }

  if (values.secondNameExtra.trim() && !onlyText.test(values.secondNameExtra)) {
    errors.secondNameExtra = message;
  }

  if (values.lastNameExtra.trim() && !onlyText.test(values.lastNameExtra)) {
    errors.lastNameExtra = message;
  }

  if (
    values.secondLastNameExtra.trim() &&
    !onlyText.test(values.secondLastNameExtra)
  ) {
    errors.secondLastNameExtra = message;
  }
  return errors;
}
