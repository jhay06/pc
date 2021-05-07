import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import './UsersList.css';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import Pagination from 'react-bootstrap/Pagination';
import ROLE from '../../../api/queries/Role';
import useTitleCase from '../../../hooks/useTitleCase';

const UsersList = ({ users }) => {
  const { titleCase } = useTitleCase();
  const { data } = useQuery(ROLE.SECTION_UNITS);

  const [userItems, setUserItems] = useState([]);
  const [sortMode, setSortMode] = useState('fullname');
  const [sortedData, setData] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  const [pagedData, setPagedData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    setUserItems(users);
  }, [users]);

  const sort = (type) => {
    setSortAscending((prev) => (sortMode === type ? !prev : true));
    setSortMode(type);
  };

  const switchPage = (e) => {
    e.persist();
    setPagination((prev) => ({
      ...prev,
      currentPage: Number(e.target.id),
    }));
  };

  useEffect(() => {
    if (userItems.length > 0) {
      setData(() => {
        const sorted = userItems[0][sortMode]
          ? _.sortBy(userItems, [
              (customer) => customer[sortMode].toLowerCase(),
            ])
          : userItems;
        return sortAscending ? sorted : sorted.reverse();
      });
    }
  }, [sortMode, sortAscending, userItems]);

  useEffect(() => {
    const { currentPage, itemsPerPage } = pagination;

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    setPagedData(sortedData.slice(indexOfFirstTodo, indexOfLastTodo));

    var someArray = [];
    const paginationTabCount = Math.ceil(userItems.length / 10);
    for (let number = 1; number <= paginationTabCount; number++) {
      someArray.push(
        <Pagination.Item
          key={number}
          active={number === pagination.currentPage}
          onClick={switchPage}
          id={number}
        >
          {number}
        </Pagination.Item>
      );
    }
    setItems(someArray);
  }, [pagination, sortedData, userItems]);

  return (
    <>
      <div className="lists-container">
        <table className="table-container">
          <thead>
            <tr className="user-label">
              <th onClick={() => sort('fullname')}>
                FullName
                {sortMode === 'fullname' &&
                  (sortAscending ? <span>&darr;</span> : <span>&uarr;</span>)}
              </th>
              <th onClick={() => sort('employeeId')}>
                Employee ID
                {sortMode === 'employeeId' &&
                  (sortAscending ? <span>&darr;</span> : <span>&uarr;</span>)}
              </th>
              <th onClick={() => sort('sectionUnit')}>
                Section / Unit
                {sortMode === 'sectionUnit' &&
                  (sortAscending ? <span>&darr;</span> : <span>&uarr;</span>)}
              </th>
              <th onClick={() => sort('designation')}>
                Designation
                {sortMode === 'designation' &&
                  (sortAscending ? <span>&darr;</span> : <span>&uarr;</span>)}
              </th>
            </tr>
          </thead>
          {data &&
            pagedData.map((user) => {
              return (
                <UserList
                  key={user.id}
                  id={user.id}
                  fullname={user.fullname}
                  employeeId={user.employeeId}
                  section={titleCase(user.sectionUnit)}
                  designation={titleCase(user.designation)}
                />
              );
            })}
        </table>
        <Pagination className="pagination-tabs">{items}</Pagination>
      </div>
    </>
  );
};

export default UsersList;

UsersList.propTypes = {
  users: PropTypes.array,
};
