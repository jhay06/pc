import { useState } from 'react';
import USER from '../api/queries/User';
import { useQuery } from '@apollo/react-hooks';

function useUsernameStandard() {
  const [errors, setErrors] = useState([]);
  const { data: usersData } = useQuery(USER.LIST);

  const checkErrors = (username) => {
    const foundErrors = [];

    const isUnique = {
      passed: usersData.users.find((user) => user.username === username)
        ? false
        : true,
      error: 'Username is already taken.',
    };

    const enoughChars = {
      passed: username.length >= 6 ? true : false,
      error: 'Username must have a minimum of 6 characters.',
    };

    const noSpaces = {
      passed: !username.split('').find((char) => char === ' ') ? true : false,
      error: 'Username must not contain spaces.',
    };

    const hasLetter = /[a-zA-Z]/g.test(username);
    const hasNumber = username
      .split('')
      .find((item) => !isNaN(item) && !isNaN(parseFloat(item)));
    const hasLettersOrNumbers = {
      passed: hasLetter || hasNumber ? true : false,
      error: 'Username should contain letters and/or numbers.',
    };

    const usernameStandards = [
      enoughChars,
      noSpaces,
      hasLettersOrNumbers,
      isUnique,
    ];
    usernameStandards
      .filter((standard) => !standard.passed)
      .map((_) => foundErrors.push(_.error));

    setErrors(foundErrors);

    return foundErrors.length > 0 ? true : false;
  };

  return { errors, checkErrors };
}

export default useUsernameStandard;
