import { useState } from "react";

import "./PasswordGenerator.css";
import { MEDIUM, GOOD, POOR, STRONG } from "../constants/status";
import usePasswordGenerator from "../hook/usePasswordGenerator";

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
  const [passwordLength, setPasswordLength] = useState(min);
  const [copied, setCopied] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, title: "Include small letters", state: false },
    { id: 2, title: "Include capital letters", state: false },
    { id: 3, title: "Include numbers", state: false },
    { id: 4, title: "Include special characters", state: false },
  ]);

  const { password, errorMessage, generatePassword } = usePasswordGenerator(
    checkboxes,
    passwordLength
  );

  const handleRangeChange = (event) => {
    setPasswordLength(event.target.value);
  };

  const handleCheckboxChange = (index) => {
    const updatedCheboxes = [...checkboxes];
    updatedCheboxes[index].state = !updatedCheboxes[index].state;
    setCheckboxes(updatedCheboxes);
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
        Character Length <span>{passwordLength}</span>
      </p>
      <input
        type="range"
        min={min}
        max={max}
        value={passwordLength}
        onChange={handleRangeChange}
        className="container__input range"
      />
      <div className="container__checkboxes">
        {checkboxes.map(({ id, title }, index) => {
          return (
            <div className="container__checkboxes-checkbox" key={id}>
              <input
                type="checkbox"
                id={`checkbox-${id}`}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`checkbox-${id}`}>{title}</label>
            </div>
          );
        })}
      </div>
      {errorMessage && <b className="error_message">{errorMessage}</b>}
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
