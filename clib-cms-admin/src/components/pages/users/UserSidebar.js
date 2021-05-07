import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import DeleteConfirmation from './DeleteConfirmation';
import EditUserForm from './EditUserForm';
import { useMutation } from '@apollo/react-hooks';
import USER from '../../../api/mutations/User';
import USER_QUERY from '../../../api/queries/User';
import flashMessages from '../../../lib/FlashMessages';
import PropTypes from 'prop-types';
import './UserSidebar.css';
import { useRole } from '../../../hooks/RoleContext';
import _ from 'lodash';
import useTitleCase from '../../../hooks/useTitleCase';

const unallowedRolesEditing = [
  {
    selfRole: 'claims_section_head',
    editRestrictions: ['claims_department_head', 'claims_division_head'],
    deleteRestrictions: ['claims_department_head', 'claims_division_head'],
  },
  {
    selfRole: 'claims_department_head',
    editRestrictions: ['claims_division_head'],
    deleteRestrictions: ['claims_division_head'],
  },
];

const UserSidebar = ({ data }) => {
  const navigate = useNavigate();
  const { titleCase } = useTitleCase();
  const [user, setUser] = useState(data);
  const [regionErrors, setRegionErrors] = useState([]);

  const { data: roleData } = useRole();

  const alignedRole = unallowedRolesEditing.find(
    (obj) => obj.selfRole === roleData.me.designation
  );

  const canEdit = alignedRole
    ? alignedRole.editRestrictions.includes(_.snakeCase(data.designation))
      ? false
      : true
    : true;

  const canDelete = alignedRole
    ? alignedRole.deleteRestrictions.includes(_.snakeCase(data.designation))
      ? false
      : true
    : true;
  useEffect(() => {
    setUser({
      ...data,
      region: data.region ? data.region.name : '',
      areaCode: data.region ? data.region.areaCode.name : '',
      designation: data.designation,
    });
  }, [data]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => {
    setShowEditModal(true);
  };
  const [deleteAdminMutation] = useMutation(USER.DELETE, {
    refetchQueries: () => [{ query: USER_QUERY.LIST }],
  });
  const [updateAdminMutation] = useMutation(USER.UPDATE);

  const updateAdmin = async () => {
    try {
      const variables = {
        ...user,
        attributes: {
          email: user.email,
          username: user.username,
          employeeId: user.employeeId,
          fullname: user.fullname,
          immediateHead: user.immediateHead,
          sectionUnit: user.sectionUnit,
          designation: user.designation,
        },
      };
      console.log(variables);
      const response = await updateAdminMutation({
        variables: variables,
      });

      const errors = response.data.updateAdmin.errors;
      if (errors.length === 0) {
        setShowEditModal(false);
        flashMessages.success('User has been updated successfully.');
      } else {
        setShowEditModal(false);

        errors.map((err) => {
          flashMessages.errors(err);
          return true;
        });
      }
    } catch (err) {
      flashMessages.errors('SERVER ERROR');
      setTimeout(() => {
        // window.location.replace('/');
      }, 5000);
    }
  };

  const deleteAdmin = async () => {
    const res = await deleteAdminMutation({ variables: { id: data.id } });
    if (res.data.deleteAdmin.errors.length === 0) {
      setShowDeleteModal(false);
      flashMessages.success('Sucessfully deleted.');
      navigate('/users');
    } else {
      flashMessages.errors(res.data.createAdmin.errors[0]);
    }
  };

  const resetSelectInput = useCallback((keyName) => {
    setUser((prev) => ({ ...prev, [keyName]: '' }));
  }, []);

  const handleSubmitDeleteUser = (event) => {
    event.preventDefault();
    deleteAdmin();
  };

  const handleSubmitUpdateUser = (event) => {
    event.preventDefault();

    const checkRegionAreaErrors = () => {
      const regionRequired = ['claims_lead', 'insurance_specialist'].includes(
        _.snakeCase(user.designation)
      );
      const errors = [];
      if (regionRequired) {
        !user.region && errors.push('region');
        !user.areaCode && errors.push('areaCode');
      }
      setRegionErrors(errors);
      return errors;
    };

    const errors = checkRegionAreaErrors();
    errors.length === 0 && updateAdmin();
  };

  const handleChangeUpdateUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="user-sidebar">
        <div className="info d-flex flex-column align-items-center">
          <ion-icon name="person-circle"></ion-icon>
          <h4 className="fullname">{data.fullname}</h4>
          <p className="id">{data.employeeId}</p>
          <div className="actions d-flex align-items-center">
            <EditUserForm
              data={user}
              show={showEditModal}
              handleClose={handleCloseEditModal}
              handleSubmit={handleSubmitUpdateUser}
              handleChange={handleChangeUpdateUser}
              resetSelectInput={resetSelectInput}
              regionErrors={regionErrors}
            />
            <Button
              className="edit"
              variant="light"
              onClick={handleShowEditModal}
              disabled={!canEdit}
            >
              Edit
            </Button>
            <DeleteConfirmation
              show={showDeleteModal}
              handleClose={handleCloseDeleteModal}
              handleSubmit={handleSubmitDeleteUser}
            />
            <Button
              variant="danger"
              onClick={handleShowDeleteModal}
              disabled={!canDelete}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="details">
          <label>Email</label>
          <p>{data.email}</p>
          <label>Designation</label>
          <p>{titleCase(data.designation)}</p>
          <label>Section / Unit</label>
          <p>{titleCase(data.sectionUnit)}</p>
          <label>Immediate Head</label>
          <p>{data.immediateHead}</p>
          {data.region && (
            <>
              <label>Region</label>
              <p>{data.region.name}</p>
              <label>Area Code</label>
              <p>{data.region.areaCode.name}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserSidebar;

UserSidebar.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    fullname: PropTypes.string,
    email: PropTypes.string,
    username: PropTypes.string,
    employeeId: PropTypes.string,
    password: PropTypes.string,
    immediateHead: PropTypes.string,
    sectionUnit: PropTypes.string,
    designation: PropTypes.string,
    region: PropTypes.string,
    areaCode: PropTypes.string,
  }),
};
