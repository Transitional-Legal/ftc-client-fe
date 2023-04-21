import React, { useContext } from "react";
import LabelledTable from "components/LabelledTable";
import { AuthContext } from "components/auth/Auth";

export default function PayInformationTable({
  bankDetails,
  userDetails
}) {
  const { user } = useContext(AuthContext);
  const ref = "REF 123";

  const columnConfig = [
    ["Account Name", bankDetails?.name],
    ["Account Number", bankDetails?.number],
    ["BSB", bankDetails?.bsb],
    ["Reference", ref]
  ];
  return <LabelledTable hover={false} columns={columnConfig} />;
}
