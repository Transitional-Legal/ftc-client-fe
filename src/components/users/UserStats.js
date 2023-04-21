import React from "react";
import { format as format$ } from "currency-formatter";
import LabelledTable from "components/LabelledTable";

const flattenData = (stats) => {
  return {
    name: stats?.stats?.name || "Mr John Doe",
    matter: stats?.stats?.matter || "Smith & Co",
    brc: stats?.stats?.brc || "BRC123/2023",
    trust: stats?.stats?.trust || 5000,
  };
};

const getColumns = (data) => {
  const map = {
    name: {
      label: "Name",
      format: (v) => `${v || 0} BTC`
    },
    matter: {
      label: "Matter",
      format: (v) => v
    },
    brc: {
      label: "BRC Number / Client Number",
      format: (v) => v
    },
    trust: {
      label: "Monies in Trust (AUD)",
      format: (v) => format$(v, { code: "AUD" })
    },
  };

  return Object.keys(data).map((key) => {
    return [map[key].label, map[key].format(data[key])];
  });
};

const UserStats = ({ stats = {} }) => {
  const data = flattenData(stats);
  const columns = getColumns(data);

  return <LabelledTable columns={columns} hover={false} />;
};

export default UserStats;
