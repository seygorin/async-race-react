import React from "react";
import WinnersTable from "../components/Winners/WinnersTable";
import WinnersPagination from "../components/Winners/WinnersPagination";
import Title from "../components/Title/Title";

function Winners() {
  return (
    <div>
      <Title text="Winners" />
      <WinnersTable />
      <WinnersPagination />
    </div>
  );
}

export default Winners;
