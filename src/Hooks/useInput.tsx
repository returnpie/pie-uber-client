import { useState } from "react";

const useInput = (init: string = "") => {
  const [value, setValue] = useState(init);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newValue = event.target.value;

    setValue(newValue);
  };

  return { value, onChange };
};

export default useInput;
