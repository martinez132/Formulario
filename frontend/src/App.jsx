import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    favoriteSport: "",
    gender: "",
    state: "",
    is21OrOlder: false,
    cars: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "cars") {
      const cars = checked
        ? [...form.cars, value]
        : form.cars.filter((c) => c !== value);
      setForm({ ...form, cars });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/save", form);
    alert("Información guardada en Excel");
  };

return (
  <div style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",   
    paddingTop: "80px",
    paddingBottom: "10px",
    backgroundColor: "#0f356dff"
  }}>
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "30px 40px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "500px",
        fontFamily: "sans-serif"
      }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Información de Actualización
        </h2>

        <div style={{ marginBottom: "10px" }}>
          <label> Nombre:</label><br />
          <input name="firstName" onChange={handleChange} required style={{ width: "100%" }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Apellido:</label><br />
          <input name="lastName" onChange={handleChange} required style={{ width: "100%" }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Deporte favorito:</label><br />
          <select name="favoriteSport" onChange={handleChange} required style={{ width: "100%" }}>
            <option value="">Selecciona un Deporte</option>
            <option value="basketball">Basketball</option>
            <option value="futbol">Fútbol</option>
            <option value="tennis">Tenis</option>
            <option value="natacion">Natación</option>
            <option value="atletismo">Atletismo</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Género:</label><br />
          <input type="radio" name="gender" value="male" onChange={handleChange} /> Masculino
          <input type="radio" name="gender" value="female" onChange={handleChange} /> Femenino
          <input type="radio" name="gender" value="not sure" onChange={handleChange} /> No estoy seguro
        </div>

        <div>
  <label>Departamento de residencia:</label>
  <Select
    options={[
      { value: "Alta Verapaz", label: "Alta Verapaz" },
      { value: "Baja Verapaz", label: "Baja Verapaz" },
      { value: "Chimaltenango", label: "Chimaltenango" },
      { value: "Chiquimula", label: "Chiquimula" },
      { value: "El Progreso", label: "El Progreso" },
      { value: "Escuintla", label: "Escuintla" },
      { value: "Guatemala", label: "Guatemala" },
      { value: "Huehuetenango", label: "Huehuetenango" },
      { value: "Izabal", label: "Izabal" },
      { value: "Jalapa", label: "Jalapa" },
      { value: "Jutiapa", label: "Jutiapa" },
      { value: "Petén", label: "Petén" },
      { value: "Quetzaltenango", label: "Quetzaltenango" },
      { value: "Quiché", label: "Quiché" },
      { value: "Retalhuleu", label: "Retalhuleu" },
      { value: "Sacatepéquez", label: "Sacatepéquez" },
      { value: "San Marcos", label: "San Marcos" },
      { value: "Santa Rosa", label: "Santa Rosa" },
      { value: "Sololá", label: "Sololá" },
      { value: "Suchitepéquez", label: "Suchitepéquez" },
      { value: "Totonicapán", label: "Totonicapán" },
      { value: "Zacapa", label: "Zacapa" },
    ]}
    onChange={(selectedOption) =>
      setForm({ ...form, state: selectedOption.value })
    }
    placeholder="Selecciona un departamento"
    menuPlacement="bottom" 
    required
  />
</div>


        <div style={{ marginBottom: "10px" }}>
          <label>
            <input type="checkbox" name="is21OrOlder" onChange={handleChange} /> 21 o mayor
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Vehículos que posee:</label><br />
          <input type="checkbox" name="cars" value="Ford" onChange={handleChange} /> Ford
          <input type="checkbox" name="cars" value="Chrysler" onChange={handleChange} /> Chrysler
          <input type="checkbox" name="cars" value="Toyota" onChange={handleChange} /> Toyota
          <input type="checkbox" name="cars" value="Nissan" onChange={handleChange} /> Nissan
        </div>

        <button type="submit" style={{
          backgroundColor: "#4285f4",
          color: "white",
          border: "none",
          padding: "10px",
          width: "100%",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default App;
