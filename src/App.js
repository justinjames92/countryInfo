import "./App.css";
import { useEffect, useState } from "react";
import sorting from "./Images/sorting.png";
import refresh from "./Images/refresh.png";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [data, setData] = useState([]);
  const [details, setdetails] = useState({});
  const [countryName, setCountryName] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
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
  const handleSort = () => {
    let sortedData = [...data].sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.name.common.localeCompare(b.name.common);
      } else {
        return b.name.common.localeCompare(a.name.common);
      }

    });
    setData(sortedData);
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');

  };

  let result = data;
  {
    countryName !== "" &&
      (result = data.filter((i) =>
        i.name.common.toLowerCase().includes(countryName.toLowerCase())
      ));
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={3}className="search">
            <input
              type="text"
              value={countryName}
              onChange={handleChange}
              placeholder="search here"
            ></input>
            <img
              onClick={() => handleSort(sortOrder)}
              src={sorting}
              width={"25px"}
              height={"25px"}
            ></img>
            <img
              onClick={() => handleSort(sortOrder)}
              src={refresh}
              width={"25px"}
              height={"25px"}
            ></img>

            <h2 className="header">World Nations</h2>
            <ul className="list">
              {result.map((i) => (
                <li>
                  <a onClick={() => displayDetail(i.name.common)}>
                    {i.name.common}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col md={6}>
            {Object.keys(details).length === 0 ? (
              <h2>Please select a country</h2>
            ) : (
              <div>
                <h2>History of countries Flag</h2>
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
      </Container>
    </>
  );
}

export default App;
