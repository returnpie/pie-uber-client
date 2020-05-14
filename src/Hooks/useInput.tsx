import { useState } from "react";

const useInput = (init: string = "") => {
  const [value, setValue] = useState<string>(init);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newValue = event.target.value;

    setValue(newValue);
  };

  return { value, onChange, setValue };
};

export default useInput;
