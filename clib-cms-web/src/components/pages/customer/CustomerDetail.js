import React from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';

export const CustomerDetail = () => (
  <>
    <div className="info-detail d-flex flex-wrap">
      <TextInput label="Fullname" />
      <SelectInput label="Gender" />
      <DateInput label="Birthdate" />
      <TextInput label="Address" />
      <SelectInput label="ID Type" />
      <TextInput label="ID Number" />
      <TextInput label="Contact Number" />
      <SelectInput label="Source of Income" />
      <TextInput label="Annual Household Income" />
    </div>
  </>
);

export default CustomerDetail;
