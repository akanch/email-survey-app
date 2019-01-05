import React from "react";

// looks into the propsand pulls out the input object and label, and tell input
// to accept all keys and values in the input object. ...input does not assign
// the input object a specific name, but rather just passes it in
export default ({ input, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};
