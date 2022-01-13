import React from "react";
import { useParams } from "react-router-dom";

export default function DetailPage() {
  const { projectid } = useParams();
  return <div>Project detail: {projectid}</div>;
}
