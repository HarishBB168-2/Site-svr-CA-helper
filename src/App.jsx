import { useState } from "react";
import "./App.css";

function App() {
  // Fields to search : CA No, Installation no, meter no, name, building code
  // csn, gsn, pole no, contact no

  const searchFields = [
    { id: "caNo", title: "CA No", type: "text" },
    { id: "installation", title: "Installation No", type: "number" },
    { id: "meterNo", title: "Meter No", type: "number" },
    { id: "name", title: "Name", type: "text" },
    { id: "buildingCode", title: "Building Code", type: "text" },
    { id: "csn", title: "CSN", type: "text" },
    { id: "gsn", title: "GSN", type: "text" },
    { id: "poleNo", title: "Pole No", type: "text" },
    { id: "contactNo", title: "Contact No", type: "text" },
  ];

  const [formData, setFormData] = useState({
    caNo: "",
    installation: "",
    name: "",
    buildingCode: "",
    csn: "",
    gsn: "",
    poleNo: "",
    contactNo: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e, fieldId) => {
    setFormData({ ...formData, [fieldId]: e.target.value });
  };

  return (
    <div className="container">
      <form className="row" method="post" onSubmit={handleFormSubmit}>
        <div className="container">
          <div className="row">
            {searchFields.slice(0, 4).map((item) => (
              <div className="column" key={item.id}>
                <label htmlFor={item.id}>{item.title}</label>
                <input
                  type={item.type}
                  placeholder={item.title}
                  id={item.id}
                  name={item.id}
                  value={formData[item.id]}
                  onChange={(e) => handleChange(e, item.id)}
                />
              </div>
            ))}
          </div>
          <div className="row">
            {searchFields.slice(4).map((item) => (
              <div className="column" key={item.id}>
                <label htmlFor={item.id}>{item.title}</label>
                <input
                  type={item.type}
                  placeholder={item.title}
                  id={item.id}
                  name={item.id}
                  value={formData[item.id]}
                  onChange={(e) => handleChange(e, item.id)}
                />
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
