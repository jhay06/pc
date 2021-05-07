import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import BodyNav from '../../BodyNav';
import UsersList from './UsersList';
import UserForm from './UserForm';
import USER from '../../../api/mutations/User';
import USER_QUERY from '../../../api/queries/User';
import flashMessages from '../../../lib/FlashMessages';
import './UsersPage.css';
import useSearch from '../../../hooks/useSearch';
import _ from 'lodash';
import useUsernameStandard from '../../../hooks/useUsernameStandard';

const initialState = {
  email: '',
  username: '',
  password: '',
  employeeId: '',
  firstName: '',
  lastName: '',
  immediateHead: '',
  sectionUnit: '',
  designation: '',
  region: '',
  areaCode: '',
};

const UserContainer = () => {
  const [user, setUser] = useState(initialState);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setUser({ ...initialState });
    setModalErrors([]);
  };
  const handleShow = () => setShow(true);
  const [createAdminMutation] = useMutation(USER.CREATE, {
    refetchQueries: () => [{ query: USER_QUERY.LIST }],
  });
  const [modalErrors, setModalErrors] = useState([]);
  const [regionErrors, setRegionErrors] = useState([]);

  const { loading, error, data } = useQuery(USER_QUERY.LIST);
  const [setSearchText, searchedData, searchText] = useSearch(
    data ? data.users : []
  );
  const { checkErrors, errors: usernameErrors } = useUsernameStandard();
  const createAdmin = async () => {
    try {
      const createAdminPayload = {
        attributes: {
          email: user.email,
          username: user.username,
          employeeId: user.employeeId,
          fullname: `${user.firstName} ${user.lastName}`,
          immediateHead: user.immediateHead,
          sectionUnit: user.sectionUnit,
          designation: user.designation,
        },
        region: user.region,
        areaCode: user.areaCode,
      };
      const response = await createAdminMutation({
        variables: createAdminPayload,
      });

      const errors = response.data.createAdmin.errors;
      if (errors.length === 0) {
        flashMessages.success('New user has been saved.');
        setShow(false);
        setUser({ ...initialState });
      } else {
        setModalErrors(errors);
        console.log('the failed payload:', user);
      }
    } catch (err) {
      flashMessages.errors(err);
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
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
    const invalidUsername = checkErrors(user.username);

    if (errors.length === 0 && !invalidUsername) {
      createAdmin();
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const resetSelectInput = useCallback((keyName) => {
    setUser((prev) => ({ ...prev, [keyName]: '' }));
  }, []);

  if (loading) return <h3>Loading. . .</h3>;
  if (error) return <h3>{`Error: ${error.message}`}</h3>;
  return (
    <>
      <div className="dashboard-container d-flex">
        <div className="tab-container">
          <UserForm
            data={user}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleClose={handleClose}
            show={show}
            errors={modalErrors}
            regionErrors={regionErrors}
            resetSelectInput={resetSelectInput}
            usernameErrors={usernameErrors}
          />
          <BodyNav
            label="Users List"
            total={data.users.length.toString()}
            onClick={handleShow}
          />
          <input
            className="search-input"
            type="search"
            id="search"
            name="search"
            placeholder="Search..."
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          ></input>
          <UsersList users={searchedData} />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default UserContainer;
