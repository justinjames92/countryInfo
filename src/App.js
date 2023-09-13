import "./App.css";
import { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

function App() {
  const [data, setData] = useState([]);
  const [details, setdetails] = useState({});
  const [countryName, setCountryName] = useState("");
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then((response) => response.text())
      .then((result) => setData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  }, []);
  console.log(data);
  const displayDetail = (countryName) => {
    let countryDetails = data.find((i) => i.name.common === countryName);
    setdetails(countryDetails);
  };
  console.log(details);

  const handleChange = (e) => {
    console.log(e.target.value);
    setCountryName(e.target.value);
  };
  console.log(countryName);
  let result = [];
  {
    countryName !== "" &&
      (result = data.filter((i) =>
        i.name.common.toLowerCase().startsWith(countryName.toLowerCase())
      ));
  }
  console.log(result);
  return (
    <>
      <Row>
        <Col md={3}>
          <h2>List of countries in world</h2>
          <ul>
            {data.map((i) => (
              <li>
                <a onClick={() => displayDetail(i.name.common)}>
                  {i.name.common}
                </a>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={3}>
          <input
            type="text"
            value={countryName}
            onChange={handleChange}
            placeholder="search here"
          ></input>
        </Col>
        <Col md={6}>
          {Object.keys(details).length === 0 ? (
            <h1>Please select a country</h1>
          ) : (
            <div>
              <h2>History of countries Flag</h2>
              <p>hghg</p>
              <p>{details?.flags?.alt}</p>
              <img
                src={details?.flags?.png}
                width={"100px"}
                height={"100px"}
                alt="National flag"
              />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

export default App;
