import React from 'react';
import TextInput from './TextInput';
import PropTypes from 'prop-types';

export const UserDetail = ({ data }) => {
  const {
    email,
    employeeId,
    fullname,
    immediateHead,
    designation,
    sectionUnit,
    username,
  } = data;

  const titleCase = (str) => {
    const words = str.split('_');
    const capitalized = words.map(
      (word) => word.charAt(0).toUpperCase() + word.substring(1, word.length)
    );
    return capitalized.join(' ');
  };

  return (
    <>
      <div className="info-detail d-flex flex-wrap">
        <TextInput disabled value={fullname} label="Full Name" />
        <TextInput disabled value={immediateHead} label="Immediate Head" />
        <TextInput disabled value={employeeId} label="Employee ID" />
        <TextInput
          disabled
          value={titleCase(sectionUnit)}
          label="Section / Unit"
        />
        <TextInput
          disabled
          value={titleCase(designation)}
          label="Designation"
        />

        <TextInput
          disabled
          value={data.region ? data.region.name : 'N/A'}
          label="Region"
        />
        <TextInput
          disabled
          value={data.region ? data.region.areaCode.name : 'N/A'}
          label="Area Code"
        />

        <TextInput disabled value={email} label="E-mail Address" />
        <TextInput disabled value={username} label="Username" />
      </div>
    </>
  );
};

export default UserDetail;

UserDetail.propTypes = {
  data: PropTypes.shape({
    fullname: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    employeeId: PropTypes.string,
    sectionUnit: PropTypes.string,
    immediateHead: PropTypes.string,
    designation: PropTypes.string,
    region: PropTypes.object,
  }),
};
