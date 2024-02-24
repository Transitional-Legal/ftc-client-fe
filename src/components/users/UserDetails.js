import React from "react";
import { format as format$ } from "currency-formatter";
import LabelledTable from "components/LabelledTable";

const flattenData = (data) => {
  return {
    name: data?.name || "Unknown",
    email: data?.email || "Unknown",
    brc: data?.brc || "NA",
    trust: data?.trust || 0,
  };
};

const getColumns = (data) => {
  const map = {
    name: {
      label: "Name",
      format: (v) => v
    },
    email: {
      label: "Email",
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

const UserDetails = ({ details = {} }) => {
  const data = flattenData(details);
  const columns = getColumns(data);

  return <LabelledTable columns={columns} hover={false} />;
};

export default UserDetails;
