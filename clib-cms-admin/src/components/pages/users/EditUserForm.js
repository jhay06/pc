import React, { useEffect, useState } from 'react';
import { Button, Modal, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TextInput from '../../TextInput';
import SelectInput from '../../SelectInput';
import './UserForm.css';
import { useQuery } from '@apollo/react-hooks';
import ROLE from '../../../api/queries/Role';
import REGION from '../../../api/queries/Region';
import Loading from '../../Loading';
import useTitleCase from '../../../hooks/useTitleCase';

const EditUserForm = ({
  data,
  handleSubmit,
  handleChange,
  handleClose,
  show,
  loading,
  resetSelectInput,
  regionErrors,
}) => {
  const { titleCase } = useTitleCase();
  const { data: sectionsData } = useQuery(ROLE.SECTION_UNITS);
  const { data: regionsData } = useQuery(REGION.REGIONS);
  const [initialLoad, setInitialLoad] = useState(true);

  const [designations, setDesignations] = useState([]);
  const [areaCodes, setAreaCodes] = useState([]);

  const needsRegion = ['Claims Lead', 'Insurance Specialist'].includes(
    data.designation
  )
    ? true
    : false;

  const handleInputChange = (e) => {
    handleChange(e);
    setInitialLoad(false);
  };

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
    if (!initialLoad) {
      resetSelectInput('designation');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.sectionUnit, resetSelectInput]);
  useEffect(() => {
    if (!initialLoad) {
      if (!needsRegion) {
        resetSelectInput('region');
        resetSelectInput('areaCode');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.designation, needsRegion, resetSelectInput]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          {loading ? (
            <Loading />
          ) : (
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
                type="fullname"
                name="fullname"
                label="Fullname"
                onChange={handleInputChange}
                value={data.fullname}
              />
              <TextInput
                type="email"
                name="email"
                label="Email"
                placeholder="Ex. email@sample.com"
                onChange={handleInputChange}
                value={data.email}
              />
              <TextInput
                type="username"
                name="username"
                label="Username"
                placeholder="ramonrapido"
                onChange={handleInputChange}
                value={data.username}
              />
              <TextInput
                type="employeeId"
                name="employeeId"
                label="Employee ID"
                placeholder="1235-123-12"
                onChange={handleInputChange}
                value={data.employeeId}
              />

              <SelectInput
                type="section"
                name="sectionUnit"
                label="Section / Unit"
                placeholder="Ex. Claim Department"
                options={
                  sectionsData
                    ? sectionsData.sectionUnits.map((item) => item.name)
                    : []
                }
                onChange={handleInputChange}
                value={titleCase(data.sectionUnit)}
              />
              <SelectInput
                type="designation"
                name="designation"
                label="Designation"
                placeholder="Ex. Sales"
                onChange={handleInputChange}
                value={titleCase(data.designation)}
                options={designations}
              />
              <TextInput
                type="immediateHead"
                name="immediateHead"
                label="Immediate Head"
                placeholder="Jose Rizal"
                onChange={handleInputChange}
                value={data.immediateHead}
                errors={''}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditUserForm;

EditUserForm.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  data: PropTypes.shape({
    fullname: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    employeeId: PropTypes.string,
    designation: PropTypes.string,
    sectionUnit: PropTypes.string,
    branchCode: PropTypes.array,
    immediateHead: PropTypes.string,
    region: PropTypes.string,
    areaCode: PropTypes.string,
  }),
  resetSelectInput: PropTypes.func,
  regionErrors: PropTypes.arrayOf(PropTypes.string),
};
