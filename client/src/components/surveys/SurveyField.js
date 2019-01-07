import React from "react";

// looks into the props and pulls out the input object and label, and tell input
// to accept all keys and values in the input object. ...input does not assign
// the input object a specific name, but rather just passes it in. We pull out
// the error and touched properties from the meta object for form validation.
// If the form fields have been touched and there is an error, then an error
// will be displayed to the user
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }}/>
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
