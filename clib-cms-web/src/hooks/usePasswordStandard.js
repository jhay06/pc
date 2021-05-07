import { useState } from 'react';
import { useRole } from './RoleContext';
import _ from 'lodash';
import { topPasswords } from '../top1000Passwords';

function usePasswordStandard() {
  const { data } = useRole();
  const { me } = data;
  console.log(me);
  const [errors, setErrors] = useState([]);

  const checkErrors = (passwordForm) => {
    const foundErrors = [];
    const { oldPass, newPass, confirmNewPass } = passwordForm;

    const diffFromOld = {
      passed: oldPass !== newPass ? true : false,
      error: 'New password must not be the same as old password.',
    };
    const passwordsMatch = {
      passed: newPass === confirmNewPass ? true : false,
      error: 'Passwords do not match.',
    };
    const enoughChars = {
      passed: newPass.length >= 8 ? true : false,
      error: 'Password must have a minimum of 8 characters.',
    };

    const hasNumber = {
      passed: newPass
        .split('')
        .find((item) => !isNaN(item) && !isNaN(parseFloat(item)))
        ? true
        : false,
      error: 'Password must contain a number.',
    };

    const noSpaces = {
      passed: !newPass.split('').find((char) => char === ' ') ? true : false,
      error: 'Password must not contain spaces.',
    };
    const caseSpecialCheck = {
      passed: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$').test(
        newPass
      ),
      error:
        'Password must contain at least one (1) of the following: an uppercase letter, a lowercase letter, and a special character.',
    };
    const noRepeatedChars = {
      passed: /(\S)(\1{2,})/g.test(newPass.replace(/\s+/g, '_')) ? false : true,
      error: 'Password should not contain three repeating characters.',
    };

    const splitFullname = me.fullname.split(' ');
    const unallowedNames = [me.username, ...splitFullname];
    const noSelfName = {
      passed: !unallowedNames.find((name) =>
        _.lowerCase(newPass).includes(_.lowerCase(name))
      )
        ? true
        : false,
      error:
        'Password must not contain your username, first name, middle name, or last name.',
    };

    const freeFromTopPasswords = {
      passed: topPasswords.find((word) => word === newPass) ? false : true,
      error: 'Password must not be one of the top 1000 passwords.',
    };

    const passwordStandards = [
      passwordsMatch,
      enoughChars,
      hasNumber,
      noSpaces,
      caseSpecialCheck,
      noSelfName,
      freeFromTopPasswords,
      diffFromOld,
      noRepeatedChars,
    ];
    passwordStandards
      .filter((standard) => !standard.passed)
      .map((_) => foundErrors.push(_.error));

    setErrors(foundErrors);

    return foundErrors.length > 0 ? true : false;
  };

  return { errors, checkErrors };
}

export default usePasswordStandard;
