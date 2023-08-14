import { useState } from "react";
import {
  CAPITAL_LETTERS,
  NUMBERS,
  SMALL_LETTERS,
  SPECIAL_CHARACTERS,
} from "../constants/passwordKeys";
import {
  INCLUDE_CAPITAL_LETTERS,
  INCLUDE_NUMBERS,
  INCLUDE_SMALL_LETTERS,
  INCLUDE_SPECIAL_CHARACTERS,
} from "../constants/others";

const usePasswordGenerator = (checkboxData, length) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const generatePassword = () => {
    let charset = "",
      generatedPassword = "";

    const selectedOptions = checkboxData.filter((checkbox) => checkbox.state);

    if (selectedOptions.length === 0) {
      setPassword("");
      setErrorMessage("Please select the criteria");
      return;
    }

    selectedOptions.forEach((option) => {
      switch (option.title) {
        case INCLUDE_SMALL_LETTERS:
          charset += SMALL_LETTERS;
          break;
        case INCLUDE_CAPITAL_LETTERS:
          charset += CAPITAL_LETTERS;
          break;
        case INCLUDE_NUMBERS:
          charset += NUMBERS;
          break;
        case INCLUDE_SPECIAL_CHARACTERS:
          charset += SPECIAL_CHARACTERS;
          break;
        default:
          return charset;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;
