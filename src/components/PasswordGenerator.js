import { useState } from "react";
import {
  NUMBERS,
  SMALL_LETTERS,
  CAPITAL_LETTERS,
  SPECIAL_CHARACTERS,
} from "../constants/passwordKeys";
import "./PasswordGenerator.css";
import { MEDIUM, GOOD, POOR, STRONG } from "../constants/status";

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
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  let string = SMALL_LETTERS + CAPITAL_LETTERS + SPECIAL_CHARACTERS + NUMBERS;

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  const generatePassword = () => {
    let pass = "";
    for (let i = 0; i <= rangeValue; i++) {
      pass += string[Math.floor(Math.random() * rangeValue)];
    }
    setPassword(pass);
    console.log("pass", pass);
  };

  const handleCheckboxChange = (e) => {
    console.log(e.target);
  };

  const getStatus = () => {
    if (password.length <= 6) {
      return POOR;
    } else if (password.length <= 10) {
      return MEDIUM;
    } else if (password.length <= 15) {
      return GOOD;
    } else if (password.length > 15) {
      return STRONG;
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="container">
      {password && (
        <div className="container__password-generator">
          <p className="container__title">{password}</p>
          <button className="btn btn-primary " onClick={handleCopyToClipboard}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <p className="container__subtitle">
        Character Length <span>{rangeValue}</span>
      </p>
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
          <input
            type="checkbox"
            id="small-letters"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="small-letters">Include Small Letters</label>
        </div>
        <div className="container__checkboxes-checkbox">
          <input
            type="checkbox"
            id="capital-letters"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="capital-letters">Include Capital Letters</label>
        </div>
        <div className="container__checkboxes-checkbox">
          <input type="checkbox" id="numbers" onChange={handleCheckboxChange} />
          <label htmlFor="numbers">Include Numbers </label>
        </div>
        <div className="container__checkboxes-checkbox">
          <input
            type="checkbox"
            id="special-characters"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="special-characters">Include Special Characters</label>
        </div>
      </div>
      <div className="container__password-strength">
        Strength: <span>{getStatus()}</span>
      </div>
      <div className="container__buttons">
        <button className="btn btn-primary" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
