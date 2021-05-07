import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

function usePagination(sortedData, searchedData) {
  const [pagedData, setPagedData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });
  const [items, setItems] = useState([]);

  const switchPage = (e) => {
    e.persist();
    setPagination((prev) => ({
      ...prev,
      currentPage: Number(e.target.id),
    }));
  };

  useEffect(() => {
    const { currentPage, itemsPerPage } = pagination;

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    setPagedData(sortedData.slice(indexOfFirstTodo, indexOfLastTodo));

    var someArray = [];
    const paginationTabCount = Math.ceil(searchedData.length / 10);
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
  }, [pagination, sortedData, searchedData]);

  return [pagedData, items, setPagination];
}

export default usePagination;
