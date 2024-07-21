import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Pagination, Button } from "antd";
import { setPage } from "../store/slices/winnersSlice";

const Winners = () => {
  const dispatch = useDispatch();
  const winners = useSelector((state) => state.winners.winners);
  const currentPage = useSelector((state) => state.winners.currentPage);
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "Car Number",
      dataIndex: "id",
      key: "id",
      render: (text) => `#${text}`,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" && sortedInfo.order,
    },
    {
      title: "Car Icon",
      dataIndex: "id",
      key: "carIcon",
      render: () => "🚗",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
    },
    {
      title: "Wins",
      dataIndex: "wins",
      key: "wins",
      sorter: (a, b) => a.wins - b.wins,
      sortOrder: sortedInfo.columnKey === "wins" && sortedInfo.order,
    },
    {
      title: "Best Time",
      dataIndex: "bestTime",
      key: "bestTime",
      sorter: (a, b) => a.bestTime - b.bestTime,
      sortOrder: sortedInfo.columnKey === "bestTime" && sortedInfo.order,
    },
  ];

  const currentData = winners.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div>
      <h1>Winners</h1>
      <Table
        dataSource={currentData}
        columns={columns}
        pagination={false}
        onChange={handleChange}
        rowKey="id"
      />
      <Pagination
        current={currentPage}
        total={winners.length}
        pageSize={10}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Winners;
