import React, { useState } from "react";

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (e) => setValue(e.target.value),
    resetValue: () => setValue(""),
  };
};
const Form = ({ onSubmit }) => {
  const { resetValue, ...text } = useInputValue("");

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(text.value);
        resetValue();
      }}
    >
      <input type="text" className="input" {...text} />
    </form>
  );
};
export default Form;
