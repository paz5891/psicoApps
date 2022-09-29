import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Redirect, Link } from "react-router-dom";
import { URL } from "../../config/option";

import "./Style.step.scss";
import "./Styles.pantient.scss";
import localService from "../../config/Local";
import ValidationStep1 from "./ValidationStep1";
import validationStep2 from "./ValidationStep2";
import validationStep3 from "./ValidationStep3";
export default class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPermissionUpdate: false,
      PermissionUpdateMessage: "Cargando...",
      IdPantient: props.match.params.idpantients || "1",
      uuidPerson: "",
      active: "",
      currentStep: 1,
      firstName: "",
      secondName: "",
      lastName: "",
      secondLastName: "",
      marriedName: "",
      bornDate: "",
      mobilePhone: "",
      email: "",
      uuidReligion: "",
      firstNameFather: "",
      secondNameFather: "",
      lastNameFather: "",
      secondLastNameFather: "",
      firstNameMother: "",
      secondNameMother: "",
      lastNameMother: "",
      secondLastNameMother: "",
      firstNameExtra: "",
      secondNameExtra: "",
      lastNameExtra: "",
      secondLastNameExtra: "",
      uuidCity: "",
      addressLine1: "",
      addressLine2: "",
      phoneNumber: "",
      comment: "",
      attachment: "",
      changeFile: "",
      gender: "",
      Edad: 9,
      City: [],
      Religion: [],
      errors1: {},
      errors2: {},
      errors3: {},
    };
  }

  componentDidMount() {
    fetch(`${URL}cities`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ City: data.data }))
      .catch((err) => console.log(err));

    fetch(`${URL}religion`, {
      headers: {
        Authorization: `Bearer ${localService.getJsonValue("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ Religion: data.data }))
      .catch((err) => console.log(err));
    if (this.state.IdPantient !== "1") {
      fetch(`${URL}persons/fulldata/${this.state.IdPantient}`, {
        headers: {
          Authorization: `Bearer ${localService.getJsonValue("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok !== false) {
            const bornDateParser = new Date(data.data[0].bornDate);

            let dia = bornDateParser.getDate() + 1;
            let mes = bornDateParser.getMonth() + 1;
            const anio = bornDateParser.getFullYear();

            if (dia < 10) {
              dia = `0${dia}`;
            }
            if (mes < 10) {
              mes = `0${mes}`;
            }

            const newBornDate = `${anio}-${mes}-${dia}`;

            this.setState({ Edad: this.EdadF(newBornDate) });

            this.setState({
              idSuccess: "",
              uuidPerson: data.data[0].uuidPerson,
              id: data.data[0].id,
              firstName: data.data[0].firstName,
              secondName: data.data[0].secondName,
              lastName: data.data[0].lastName,
              secondLastName: data.data[0].secondLastName,
              marriedName: data.data[0].marriedName,
              bornDate: newBornDate,
              mobilePhone: data.data[0].mobilePhone,
              email: data.data[0].email,
              uuidReligion: data.data[0].uuidReligion,
              firstNameFather: data.data[0].firstNameFather,
              secondNameFather: data.data[0].secondNameFather,
              lastNameFather: data.data[0].lastNameFather,
              secondLastNameFather: data.data[0].secondLastNameFather,
              firstNameMother: data.data[0].firstNameMother,
              secondNameMother: data.data[0].secondNameMother,
              lastNameMother: data.data[0].lastNameMother,
              secondLastNameMother: data.data[0].secondLastNameMother,
              firstNameExtra: data.data[0].firstNameExtra,
              secondNameExtra: data.data[0].secondNameExtra,
              lastNameExtra: data.data[0].lastNameExtra,
              secondLastNameExtra: data.data[0].secondLastNameExtra,
              attachment: data.data[0].attachment,
              comment: data.data[0].comment,
              uuidCity: data.data[0].uuidCity,
              addressLine1: data.data[0].addressLine1,
              addressLine2: data.data[0].addressLine2,
              phoneNumber: data.data[0].phoneNumber,
              active: data.data[0].active,
              changeFile: data.data[0].attachment,
              gender: data.data[0].gender,
            });
          }
          this.setState({ dataPermissionUpdate: data.ok, PermissionUpdateMessage: data.message })

        })
        .catch((err) => console.log(err));
    } else if (localService.getJsonValue("rol") === "admin" && this.state.IdPantient === "1") {
      this.setState({ dataPermissionUpdate: true, PermissionUpdateMessage: "ok" })
    } else {
      this.setState({ dataPermissionUpdate: false, PermissionUpdateMessage: "Ups! Solo el admin puede ejecutar esta operación" })
    }
  }

  handleChange = (event) => {
    if (event.is) {
      const { name, value } = event;
      if (name === "bornDate") {
        this.setState({ Edad: this.EdadF(value) });
      }

      this.setState({
        [name]: value,
      });
    } else {
      const { name, value } = event.target;

      if (name === "bornDate") {
        this.setState({ Edad: this.EdadF(value) });
      }

      if (name === "attachment") {
        const value1 = event.target.files[0];
        this.setState({
          [name]: value1,
        });
      } else {
        this.setState({
          [name]: value,
        });
      }
    }
  };

  EdadF(FechaNacimiento) {
    var fechaNace = new Date(FechaNacimiento);
    var fechaActual = new Date();

    var mes = fechaActual.getMonth();
    var dia = fechaActual.getDate();
    var año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);

    var edad = Math.floor(
      (fechaActual - fechaNace) / (1000 * 60 * 60 * 24) / 365
    );

    return edad;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    const values = this.state;
    const errs = validationStep3(values);
    this.setState({ errors3: errs });
    const band = Object.keys(errs).length === 0;
    if (!band) return;

    formData.append("firstName", this.state.firstName);
    formData.append("secondName", this.state.secondName);
    formData.append("lastName", this.state.lastName);
    formData.append("secondLastName", this.state.secondLastName);
    formData.append("marriedName", this.state.marriedName);
    formData.append("bornDate", this.state.bornDate);
    formData.append("mobilePhone", this.state.mobilePhone);
    formData.append("email", this.state.email);
    formData.append("uuidReligion", this.state.uuidReligion);
    formData.append("firstNameFather", this.state.firstNameFather);
    formData.append("secondNameFather", this.state.secondNameFather);
    formData.append("lastNameFather", this.state.lastNameFather);
    formData.append("secondLastNameFather", this.state.secondLastNameFather);
    formData.append("firstNameMother", this.state.firstNameMother);
    formData.append("secondNameMother", this.state.secondNameMother);
    formData.append("lastNameMother", this.state.lastNameMother);
    formData.append("secondLastNameMother", this.state.secondLastNameMother);
    formData.append("firstNameExtra", this.state.firstNameExtra);
    formData.append("secondNameExtra", this.state.secondNameExtra);
    formData.append("lastNameExtra", this.state.lastNameExtra);
    formData.append("secondLastNameExtra", this.state.secondLastNameExtra);
    formData.append("uuidCity", this.state.uuidCity);
    formData.append("addressLine1", this.state.addressLine1);
    formData.append("addressLine2", this.state.addressLine2);
    formData.append("phoneNumber", this.state.phoneNumber);
    formData.append("comment", this.state.comment);
    formData.append("attachment", this.state.attachment);
    formData.append("gender", this.state.gender);

    if (this.state.IdPantient !== "1") {
      formData.append("uuidPerson", this.state.uuidPerson);
      formData.append("active", this.state.active);
      formData.append("changeFile", this.state.changeFile);

      fetch(`${URL}persons/${this.state.IdPantient}`, {
        headers: {
          Authorization: `Bearer ${localService.getJsonValue("token")}`,
        },
        method: "PUT",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            alert(data.message);
            this.setState({ idSuccess: true });
          }
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`${URL}persons/create`, {
        headers: {
          Authorization: `Bearer ${localService.getJsonValue("token")}`,
        },
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            alert(data.message);
            this.setState({ idSuccess: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  _next = () => {
    const values = this.state;
    let currentStep = values.currentStep;
    if (currentStep === 1) {
      const errs = ValidationStep1(values);
      this.setState({ errors1: errs });
      const band = Object.keys(errs).length === 0;
      if (!band) return;
    }
    if (currentStep === 2) {
      const errs = validationStep2(values);
      this.setState({ errors2: errs });
      const band = Object.keys(errs).length === 0;
      if (!band) return;
    }
    if (this.state.Edad >= 18) {
      currentStep = currentStep >= 1 ? 3 : currentStep + 1;
    } else {
      currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    }
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    if (this.state.Edad >= 18) {
      currentStep = currentStep === 3 ? 1 : currentStep - 1;
    } else {
      currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    }
    this.setState({
      currentStep: currentStep,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button className="button11 mt-11" type="button" onClick={this._prev}>
          Regresar
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;

    if (currentStep < 3) {
      return (
        <button className="button1 mt-11" type="button" onClick={this._next}>
          Siguiente
        </button>
      );
    }
    return null;
  }

  render() {
    if (this.state.dataPermissionUpdate === false) {
      return (
        <div className="mt-8">
          <div className="l-cols-12 xl-cols-12" >
            <div style={{ color: "black", textAlign: "center" }}>
              <h2>{this.state.PermissionUpdateMessage}</h2>
            </div>
          </div>
        </div>
      );
    }
    const navegacion = (from, to) => {
      if (from === 1 && to > from) {
        const values = this.state;
        const errs = ValidationStep1(values);
        this.setState({ errors1: errs });
        const band = Object.keys(errs).length === 0;
        if (!band) return;
        this.setState({ currentStep: to });
      }
      if (from === 2 && to > from) {
        const values = this.state;
        const errs = validationStep2(values);
        this.setState({ errors2: errs });
        const band = Object.keys(errs).length === 0;
        if (!band) return;
        this.setState({ currentStep: to });
        return;
      }
      this.setState({ currentStep: to });
    };
    return (
      <React.Fragment>
        <div className="ed-container mt-8">
          <div className="ed-item">
            {this.state.IdPantient === "1" ? (
              <h1>Crear paciente</h1>
            ) : (
              <h1>Actualizar pacientes</h1>
            )}
            <hr />
          </div>
          {this.state.Edad >= 18 ? (
            <div className="ed-item ed-container mt1">
              <div className="ed-item flex">
                <button
                  className={
                    this.state.currentStep === 1
                      ? "menu-wizard paso"
                      : "menu-wizard"
                  }
                  onClick={() => navegacion(this.state.currentStep, 1)}
                >
                  Paso 1
                </button>
                <button
                  className={
                    this.state.currentStep === 3
                      ? "menu-wizard paso"
                      : "menu-wizard"
                  }
                  onClick={() => navegacion(this.state.currentStep, 3)}
                >
                  Paso 2
                </button>
              </div>
            </div>
          ) : (
            <div className="ed-item ed-container mt1">
              <div className="ed-item flex">
                <button
                  className={
                    this.state.currentStep === 1
                      ? "menu-wizard paso"
                      : "menu-wizard"
                  }
                  onClick={() => navegacion(this.state.currentStep, 1)}
                >
                  Paso 1
                </button>
                <button
                  className={
                    this.state.currentStep === 2
                      ? "menu-wizard paso"
                      : "menu-wizard"
                  }
                  onClick={() => navegacion(this.state.currentStep, 2)}
                >
                  Paso 2
                </button>
                <button
                  className={
                    this.state.currentStep === 3
                      ? "menu-wizard paso"
                      : "menu-wizard"
                  }
                  onClick={() => navegacion(this.state.currentStep, 3)}
                >
                  Paso 3
                </button>
              </div>
            </div>
          )}
        </div>
        <form className="ed-container mb-6" onSubmit={this.handleSubmit}>
          <Step1
            Religion={this.state.Religion}
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            firstName={this.state.firstName}
            secondName={this.state.secondName}
            lastName={this.state.lastName}
            secondLastName={this.state.secondLastName}
            marriedName={this.state.marriedName}
            bornDate={this.state.bornDate}
            mobilePhone={this.state.mobilePhone}
            email={this.state.email}
            uuidReligion={this.state.uuidReligion}
            gender={this.state.gender}
            errors={this.state.errors1}
          />

          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            firstNameFather={this.state.firstNameFather}
            secondNameFather={this.state.secondNameFather}
            lastNameFather={this.state.lastNameFather}
            secondLastNameFather={this.state.secondLastNameFather}
            firstNameMother={this.state.firstNameMother}
            secondNameMother={this.state.secondNameMother}
            lastNameMother={this.state.lastNameMother}
            secondLastNameMother={this.state.secondLastNameMother}
            firstNameExtra={this.state.firstNameExtra}
            secondNameExtra={this.state.secondNameExtra}
            lastNameExtra={this.state.lastNameExtra}
            secondLastNameExtra={this.state.secondLastNameExtra}
            errors={this.state.errors2}
          />

          <Step3
            IdPantient={
              this.state.IdPantient !== "1"
                ? "Actualizar Paciente"
                : "Crear Paciente"
            }
            currentStep={this.state.currentStep}
            idSuccess={this.state.idSuccess}
            handleChange={this.handleChange}
            City={this.state.City}
            uuidCity={this.state.uuidCity}
            addressLine1={this.state.addressLine1}
            addressLine2={this.state.addressLine2}
            phoneNumber={this.state.phoneNumber}
            comment={this.state.comment}
            attachment={this.state.attachment}
            errors={this.state.errors3}
          />

          <div className="ed-item mt11">
            {this.previousButton()}
            {this.nextButton()}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

function Step1({
  Religion,
  currentStep,
  handleChange,
  firstName,
  secondName,
  lastName,
  secondLastName,
  marriedName,
  bornDate,
  mobilePhone,
  email,
  uuidReligion,
  gender,
  errors,
}) {
  if (currentStep !== 1) {
    return null;
  }
  return (
    <>
      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="firstName">Primer Nombre <span className="require">(Requerido)</span></label>
          <input
            className="INPUT"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Primer Nombre"
            value={firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className="alert">{errors.firstName}</p>}
        </div>

        <div className="ed-item s-100 m-50">
          <label htmlFor="secondName">Segundo Nombre</label>
          <input
            className="INPUT"
            placeholder="Segundo Nombre"
            id="secondName"
            type="text"
            name="secondName"
            onChange={handleChange}
            value={secondName}
          />
          {errors.secondName && <p className="alert">{errors.secondName}</p>}
        </div>
      </div>

      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="lastName">Primer Apellido <span className="require">(Requerido)</span></label>
          <input
            className="INPUT"
            placeholder="Primer Apellido"
            id="lastName"
            type="text"
            name="lastName"
            onChange={handleChange}
            value={lastName}
            required
          />
          {errors.lastName && <p className="alert">{errors.lastName}</p>}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="secondLastName">Segundo Apellido</label>
          <input
            className="INPUT"
            placeholder="Segundo Apellido"
            id="secondLastName"
            type="text"
            name="secondLastName"
            onChange={handleChange}
            value={secondLastName}
          />
          {errors.secondLastName && (
            <p className="alert">{errors.secondLastName}</p>
          )}
        </div>
      </div>

      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="marriedName">Apellido de Casada</label>
          <input
            className="INPUT"
            placeholder="Apellido de Casada"
            id="marriedName"
            type="text"
            name="marriedName"
            onChange={handleChange}
            value={marriedName}
          />
          {errors.marriedName && <p className="alert">{errors.marriedName}</p>}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="bornDate">Fecha de Nacimiento <span className="require">(Requerido)</span></label>
          <input
            className="INPUT"
            id="bornDate"
            type="date"
            max={new Date().toDateString()}
            name="bornDate"
            onChange={handleChange}
            value={bornDate}
          />
          {errors.bornDate && <p className="alert">{errors.bornDate}</p>}
        </div>
      </div>

      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="mobilePhone">Teléfono móvil</label>
          <input
            className="INPUT"
            placeholder="Teléfono móvil"
            id="mobilePhone"
            type="number"
            name="mobilePhone"
            onChange={handleChange}
            value={mobilePhone}
          />
          {errors.mobilePhone && <p className="alert">{errors.mobilePhone}</p>}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="email">Dirección de Email</label>
          <input
            className="INPUT"
            placeholder="Email"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && <p className="alert">{errors.email}</p>}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="uuidReligion">Religión <span className="require">(Requerido)</span></label>
          <select
            className="select-css"
            value={uuidReligion || 0}
            name="uuidReligion"
            onChange={handleChange}
          >
            <option value="0">Seleccionar un valor</option>
            {Religion.map(({ uuid, name }) => (
              <option key={uuid} value={uuid}>
                {name}
              </option>
            ))}
          </select>
          {errors.uuidReligion && (
            <p className="alert">{errors.uuidReligion}</p>
          )}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="gender">Género <span className="require">(Requerido)</span></label>
          <select
            className="select-css"
            value={gender || 0}
            name="gender"
            onChange={handleChange}
          >
            <option value="0">Seleccionar un valor</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
          {errors.gender && <p className="alert">{errors.gender}</p>}
        </div>
      </div>
    </>
  );
}

function Step2({
  currentStep,
  handleChange,
  firstNameFather,
  secondNameFather,
  lastNameFather,
  secondLastNameFather,
  firstNameMother,
  secondNameMother,
  lastNameMother,
  secondLastNameMother,
  firstNameExtra,
  secondNameExtra,
  lastNameExtra,
  secondLastNameExtra,
  errors,
}) {
  if (currentStep !== 2) {
    return null;
  }

  return (
    <>
      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="firstNameFather">Primer Nombre del Padre <span className="require">(Requerido)</span></label>
          <input
            className="INPUT"
            placeholder="Primer Nombre del Padre"
            id="firstNameFather"
            type="text"
            onChange={handleChange}
            name="firstNameFather"
            value={firstNameFather}
          />
          {errors.firstNameFather && (
            <p className="alert">{errors.firstNameFather}</p>
          )}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="secondNameFather">Segundo Nombre del Padre</label>
          <input
            className="INPUT"
            placeholder="Segundo Nombre del Padre"
            id="secondNameFather"
            type="text"
            onChange={handleChange}
            name="secondNameFather"
            value={secondNameFather}
          />
          {errors.secondNameFather && (
            <p className="alert">{errors.secondNameFather}</p>
          )}
        </div>
      </div>
      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="lastNameFather">Primer Apellido del Padre <span className="require">(Requerido)</span></label>
          <input
            className="INPUT"
            placeholder="Primer Apellido del Padre"
            id="lastNameFather"
            type="text"
            onChange={handleChange}
            name="lastNameFather"
            value={lastNameFather}
          />
          {errors.lastNameFather && (
            <p className="alert">{errors.lastNameFather}</p>
          )}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="secondLastNameFather">
            Segundo Apellido del Padre
          </label>
          <input
            className="INPUT"
            placeholder="Segundo Apellido del Padre"
            id="secondLastNameFather"
            type="text"
            onChange={handleChange}
            name="secondLastNameFather"
            value={secondLastNameFather}
          />
          {errors.secondLastNameFather && (
            <p className="alert">{errors.secondLastNameFather}</p>
          )}
        </div>
      </div>

      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="firstNameMother">Primer Nombre de la Madre <span className="require">(Requerido)</span></label>
          <input
            className="INPUT"
            placeholder="Primer Nombre de la Madre"
            id="firstNameMother"
            type="text"
            onChange={handleChange}
            name="firstNameMother"
            value={firstNameMother}
          />
          {errors.firstNameMother && (
            <p className="alert">{errors.firstNameMother}</p>
          )}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="secondNameMother">Segundo Nombre de la Madre </label>
          <input
            className="INPUT"
            placeholder="Segundo Nombre de la Madre"
            id="secondNameMother"
            type="text"
            onChange={handleChange}
            name="secondNameMother"
            value={secondNameMother}
          />
          {errors.secondNameMother && (
            <p className="alert">{errors.secondNameMother}</p>
          )}
        </div>
      </div>
      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="lastNameMother">Primer Apellido de la Madre <span className="require">(Requerido)</span></label>
          <input
            className="INPUT"
            placeholder="Primer Apellido de la Madre"
            id="lastNameMother"
            type="text"
            onChange={handleChange}
            name="lastNameMother"
            value={lastNameMother}
          />
          {errors.lastNameMother && (
            <p className="alert">{errors.lastNameMother}</p>
          )}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="secondLastNameMother">
            Segundo Apellido de la Madre
          </label>
          <input
            className="INPUT"
            placeholder="Segundo Apellido de la Madre"
            id="secondLastNameMother"
            type="text"
            onChange={handleChange}
            name="secondLastNameMother"
            value={secondLastNameMother}
          />
          {errors.secondLastNameMother && (
            <p className="alert">{errors.secondLastNameMother}</p>
          )}
        </div>
      </div>
      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="firstNameExtra">Primer Nombre Extra</label>
          <input
            className="INPUT"
            placeholder="Primer Nombre Extra"
            id="firstNameExtra"
            type="text"
            onChange={handleChange}
            name="firstNameExtra"
            value={firstNameExtra}
          />
          {errors.firstNameExtra && (
            <p className="alert">{errors.firstNameExtra}</p>
          )}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="secondNameExtra">Segundo Nombre Extra</label>
          <input
            className="INPUT"
            placeholder="Segundo Nombre Extra"
            id="secondNameExtra"
            type="text"
            onChange={handleChange}
            name="secondNameExtra"
            value={secondNameExtra}
          />
          {errors.secondNameExtra && (
            <p className="alert">{errors.secondNameExtra}</p>
          )}
        </div>
      </div>

      <div className="ed-item ed-container">
        <div className="ed-item s-100 m-50">
          <label htmlFor="lastNameExtra">Primer Apellido Extra</label>
          <input
            className="INPUT"
            placeholder="Primer Apellido Extra"
            id="lastNameExtra"
            type="text"
            onChange={handleChange}
            name="lastNameExtra"
            value={lastNameExtra}
          />
          {errors.lastNameExtra && (
            <p className="alert">{errors.lastNameExtra}</p>
          )}
        </div>
        <div className="ed-item s-100 m-50">
          <label htmlFor="secondLastNameExtra">Segundo Apellido Extra </label>
          <input
            className="INPUT"
            placeholder="Segundo Apellido Extra"
            id="secondLastNameExtra"
            type="text"
            onChange={handleChange}
            name="secondLastNameExtra"
            value={secondLastNameExtra}
          />
          {errors.secondLastNameExtra && (
            <p className="alert">{errors.secondLastNameExtra}</p>
          )}
        </div>
      </div>
    </>
  );
}

const Step3 = ({
  IdPantient,
  idSuccess,
  City,
  currentStep,
  handleChange,
  uuidCity,
  addressLine1,
  addressLine2,
  phoneNumber,
  comment,
  attachment,
  errors,
}) => {
  if (currentStep !== 3) {
    return null;
  }

  const handleArchivo = () => {
    if (attachment) {
      fetch(`${URL}attachment/${attachment}`)
        .then((rest) => rest.json())
        .then((data) => {
          if (data.ok) {
            window.open(data.url, "_blank");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("No hay archivo para descargar");
    }
  };

  return (
    <>
      <div className="ed-item">
        <label htmlFor="uuidCity">Ciudad <span className="require">(Requerido)</span></label>
        <select
          className="select-css"
          name="uuidCity"
          value={uuidCity}
          onChange={handleChange}
          required
        >
          <option value="0">Seleccionar un valor</option>
          {City.map(({ uuid, name }) => (
            <option key={uuid} value={uuid}>
              {name}
            </option>
          ))}
        </select>
        {errors.uuidCity && <p className="alert">{errors.uuidCity}</p>}
      </div>
      <div className="ed-item">
        <label htmlFor="addressLine1">Dirección Principal <span className="require">(Requerido)</span></label>
        <input
          className="INPUT"
          placeholder="Dirección Principal"
          id="addressLine1"
          type="text"
          name="addressLine1"
          value={addressLine1}
          onChange={handleChange}
        />
        {errors.addressLine1 && <p className="alert">{errors.addressLine1}</p>}
      </div>

      <div className="ed-item">
        <label htmlFor="addressLine2">Dirección Secundaria</label>
        <input
          className="INPUT"
          placeholder="Dirección Secundaria"
          id="addressLine2"
          type="text"
          name="addressLine2"
          value={addressLine2}
          onChange={handleChange}
        />
      </div>
      <div className="ed-item">
        <label htmlFor="phoneNumber">Teléfono de Casa</label>
        <input
          className="INPUT"
          placeholder="Teléfono de Casa"
          id="phoneNumber"
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p className="alert">{errors.phoneNumber}</p>}
      </div>

      <div className="ed-item">
        <label>Comentario </label>
        <CKEditor
          editor={ClassicEditor}
          data={comment}
          onInit={() => { }}
          onChange={(_event, editor) => {
            const data = {
              value: editor.getData(),
              is: true,
              name: "comment",
            };
            handleChange(data);
          }}
        />
      </div>
      <div className="ed-item ed-container flex-center mt-11">
        <div className="ed-item m-80 ">
          <div className="forms mt-11">
            <div
              className="file-upload-wrapper"
              data-text={
                attachment
                  ? attachment.name ||
                  `Archivo.${attachment.slice(
                    ((attachment.lastIndexOf(".") - 1) >>> 0) + 2
                  )}`
                  : "Seleccionar archivo"
              }
            >
              <input
                name="attachment"
                onChange={handleChange}
                type="file"
                className="file-upload-field"
              />
            </div>
          </div>
        </div>
        {IdPantient === "Actualizar Paciente" ? (
          <div className="ed-item m-20  flex flex-right">
            <Link
              to="#"
              className="button11 mt-11 btn-link"
              onClick={() => handleArchivo()}
            >
              Descargar Archivo
            </Link>
          </div>
        ) : null}
      </div>
      <div className="ed-item mt-11">
        <button className="button1 mt-11">{IdPantient}</button>
      </div>

      {idSuccess ? <Redirect to="/pantient" /> : null}
    </>
  );
};
