import React, { useContext } from "react";
import LabelledTable from "components/LabelledTable";
import { AuthContext } from "components/auth/Auth";

export default function PayInformationTable({
  bankDetails
}) {
  const { user } = useContext(AuthContext);
  // const ref = "REF 123";

  const columnConfig = [
    ["Account Name", bankDetails?.name],
    ["Account Number", bankDetails?.account],
    ["BSB", bankDetails?.bsb],
    ["Reference", bankDetails?.ref]
  ];
  return <LabelledTable hover={false} columns={columnConfig} />;
}
