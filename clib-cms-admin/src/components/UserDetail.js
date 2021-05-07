import React from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

export const UserDetail = () => (
  <>
    <div className="user-detail d-flex flex-wrap">
      <SelectInput label="Enable / Disable Account" />
      <TextInput label="Password" />
      <TextInput label="Username" />
      <SelectInput label="User Role" />
      <TextInput label="Employee ID" />
      <SelectInput label="Designation" />
      <SelectInput label="Section / Unit" />
      <SelectInput label="Immediate Head" />
      <TextInput label="Email Adress" />
    </div>
  </>
);

export default UserDetail;
