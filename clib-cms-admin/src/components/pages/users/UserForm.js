import React, { useEffect, useState } from 'react';
import { Button, Modal, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TextInput from '../../TextInput';
import SelectInput from '../../SelectInput';
import './UserForm.css';
import { useQuery } from '@apollo/react-hooks';
import ROLE from '../../../api/queries/Role';
import REGION from '../../../api/queries/Region';
import { useRole } from '../../../hooks/RoleContext';

const unallowedRolesAdding = [
  {
    selfRole: 'claims_section_head',
    restrictions: ['Claims Division Head', 'Claims Department Head'],
  },
  {
    selfRole: 'claims_department_head',
    restrictions: ['Claims Division Head'],
  },
];

const UserForm = ({
  data,
  handleSubmit,
  handleChange,
  handleClose,
  show,
  errors,
  regionErrors,
  resetSelectInput,
  usernameErrors,
}) => {
  const [errorSet, setErrorSet] = useState({
    password: '',
    email: '',
    fullName: '',
    employee: '',
    username: '',
  });
  const role = useRole();
  const { data: sectionsData } = useQuery(ROLE.SECTION_UNITS);
  const { data: regionsData } = useQuery(REGION.REGIONS);

  const [designations, setDesignations] = useState([]);
  const [areaCodes, setAreaCodes] = useState([]);

  const needsRegion = ['Claims Lead', 'Insurance Specialist'].includes(
    data.designation
  )
    ? true
    : false;

  useEffect(() => {
    if (sectionsData) {
      const currentSection = sectionsData.sectionUnits.find(
        (item) => item.name === data.sectionUnit
      );
      if (currentSection) {
        const availableDesignations = currentSection.designations.map(
          (designation) => designation.name
        );
        setDesignations(availableDesignations);
      }
    }
  }, [sectionsData, data]);

  useEffect(() => {
    if (regionsData) {
      const currentRegion = regionsData.regions.find(
        (item) => item.name === data.region
      );
      if (currentRegion) {
        const availableAreaCodes = currentRegion.areaCodes.map(
          (area) => area.name
        );
        setAreaCodes(availableAreaCodes);
      }
    }
  }, [regionsData, data]);

  useEffect(() => {
    resetSelectInput('designation');
  }, [data.sectionUnit, resetSelectInput]);
  useEffect(() => {
    if (!needsRegion) {
      resetSelectInput('region');
      resetSelectInput('areaCode');
    }
  }, [data.designation, needsRegion, resetSelectInput]);

  useEffect(() => {
    setErrorSet({
      password: errors.filter((err) => err.includes('Password')),
      email: errors.filter((err) => err.includes('Email')),
      fullName: errors.filter((err) => err.includes('Fullname')),
      employee: errors.filter((err) => err.includes('Employee')),
      username: errors.filter((err) => err.includes('Username')),
    });
  }, [errors]);

  return (
    <>
      {role.data && (
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Body>
            <div className="user-form d-flex flex-wrap">
              <SelectInput
                type="activation"
                name="activation"
                label="Enable / Disable Account"
                placeholder="Ex. Sales"
                options={['Enable', 'Disable']}
              />
              <Col md={{ span: 4, offset: 4 }}></Col>
              <TextInput
                type="username"
                name="username"
                label="Username"
                placeholder="juandelacruz"
                onChange={handleChange}
                value={data.username}
                errors={[...errorSet.username, ...usernameErrors]}
              />

              <TextInput
                type="firstName"
                name="firstName"
                label="First Name"
                placeholder="Juan"
                onChange={handleChange}
                value={data.firstName}
                errors={errorSet.fullName}
              />
              <TextInput
                type="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Dela Cruz"
                onChange={handleChange}
                value={data.lastName}
                errors={errorSet.fullName}
              />
              <SelectInput
                type="sectionUnit"
                name="sectionUnit"
                label="Section / Unit"
                placeholder="Ex. Claim Department"
                options={
                  sectionsData
                    ? sectionsData.sectionUnits.map((item) => item.name)
                    : []
                }
                onChange={handleChange}
                value={data.sectionUnit}
              />
              <TextInput
                type="employeeId"
                name="employeeId"
                label="Employee ID"
                placeholder="1235-123-12"
                onChange={handleChange}
                value={data.employeeId}
                errors={errorSet.employee}
              />
              <SelectInput
                type="designation"
                name="designation"
                label="Designation"
                placeholder="Ex. Sales"
                options={designations}
                onChange={handleChange}
                value={data.designation}
                isDisabled={designations.length === 0}
                unallowedRoles={unallowedRolesAdding.find(
                  (item) => item.selfRole === role.data.me.designation
                )}
              />
              <TextInput
                type="immediateHead"
                name="immediateHead"
                label="Immediate Head"
                placeholder="Jose Rizal"
                onChange={handleChange}
                value={data.immediateHead}
                errors={[]}
              />
              <TextInput
                type="email"
                name="email"
                label="E-mail Address"
                placeholder="Ex. email@sample.com"
                onChange={handleChange}
                value={data.email}
                errors={errorSet.email}
              />

              <SelectInput
                type="region"
                name="region"
                label="Region"
                options={
                  regionsData
                    ? regionsData.regions.map((region) => region.name)
                    : []
                }
                onChange={handleChange}
                value={data.region}
                isDisabled={!needsRegion}
                errors={[
                  regionErrors?.includes('region') &&
                    'Region is required for this role.',
                ]}
              />
              <SelectInput
                type="areaCode"
                name="areaCode"
                label="Area Code"
                options={areaCodes}
                onChange={handleChange}
                value={data.areaCode}
                isDisabled={needsRegion ? (data.region ? false : true) : true}
                errors={[
                  regionErrors?.includes('areaCode') &&
                    'Area Code is required for this role.',
                ]}
              />

              <div className="action col-md-12">
                <Button variant="light" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default UserForm;

UserForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  data: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    employeeId: PropTypes.string,
    password: PropTypes.string,
    userRole: PropTypes.string,
    immediateHead: PropTypes.string,
    sectionUnit: PropTypes.string,
    designation: PropTypes.string,
    branchCode: PropTypes.array,
    region: PropTypes.string,
    areaCode: PropTypes.string,
  }),
  errors: PropTypes.array,
  regionErrors: PropTypes.arrayOf(PropTypes.string),
  resetSelectInput: PropTypes.func,
  usernameErrors: PropTypes.array,
};
