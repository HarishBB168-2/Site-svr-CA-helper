import { useState } from "react";
import httpService from "./services/httpService";
import "./App.css";
import ListItem from "./components/ListItem";

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

  const [intersectionSearch, setIntersectionSearch] = useState(true);
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

  const [resultData, setResultData] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    Object.keys(formData).forEach((item) => {
      if (formData[item].length > 0) payload[item] = formData[item];
    });

    const url = intersectionSearch
      ? "http://127.0.0.1:8000/api/intersectionSearch"
      : "http://127.0.0.1:8000/api/search";
    const { data } = await httpService.post(url, payload);
    setResultData(data);
  };

  const handleChange = (e, fieldId) => {
    setFormData({ ...formData, [fieldId]: e.target.value });
  };

  return (
    <div className="container">
      <form className="row" method="post" onSubmit={handleFormSubmit}>
        <div className="container">
          <div className="row">
            <label htmlFor="intersectionSearch">Intersection Search</label>
            <input
              type="checkbox"
              name="intersectionSearch"
              id="intersectionSearch"
              checked={intersectionSearch}
              onChange={() => setIntersectionSearch(!intersectionSearch)}
            />
          </div>
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
      {resultData && (
        <div>
          {resultData.map((item, idx) => (
            <ListItem data={item} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
