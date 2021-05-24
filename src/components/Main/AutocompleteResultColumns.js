import React, { useEffect, useState } from "react";

import { StoreManager } from "localstorage-lib";

export const COLUMNS_AUTO_COMPLETE = [
  {
    Header: "IFSC Code",
    accessor: "ifsc",
  },
  {
    Header: "Branch Name",
    accessor: "branch",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "State",
    accessor: "state",
  },
  {
    Header: "Address",
    Cell: (props) => {
      const { address } = props.data[props.cell.row.index];
      return <span className="text-sm">{address}</span>;
    },
  },
];
