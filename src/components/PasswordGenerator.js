import { useState } from "react";
import "./PasswordGenerator.css";

/*

Requirements

- length can range from 4 to 20
- password strenth : poor, good, strong
- options
  - include capital letter
  - include small letter
  - include special characters
  - include numbers
- copy to clipboard functionality

Steps:

1. Create Basic layout of password generator
2. Assign State to range component
3. Add some styling to it
4. Add checkbox of 4 options
5. Generate password from checked options



*/

const PasswordGenerator = ({ min = 4, max = 20 }) => {
  const [rangeValue, setRangeValue] = useState(min);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="container__title">Generated Password</h1>
      <p className="container__subtitle">Password Length: {rangeValue}</p>
      <input
        type="range"
        min={min}
        max={max}
        value={rangeValue}
        onChange={handleRangeChange}
        className="container__input range"
      />
      <div className="container__checkboxes">
        <div className="container__checkboxes-checkbox">
          <input type="checkbox" id="small-letters" />
          <label htmlFor="small-letters">Include Small Letters</label>
        </div>
        <div className="container__checkboxes-checkbox">
          <input type="checkbox" id="capital-letters" />
          <label htmlFor="capital-letters">Include Capital Letters</label>
        </div>
        <div className="container__checkboxes-checkbox">
          <input type="checkbox" id="numbers" />
          <label htmlFor="numbers">Include Numbers </label>
        </div>
        <div className="container__checkboxes-checkbox">
          <input type="checkbox" id="special-characters" />
          <label htmlFor="special-characters">Include Special Characters</label>
        </div>
      </div>
      <div className="container__password-status">
        Status: <b>Poor</b>
      </div>
      <div className="container__buttons">
        <button className="btn btn-primary">Generate Passwor</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
