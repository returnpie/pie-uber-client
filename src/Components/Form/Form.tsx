import React from "react";

interface IProps {
  submitFn: any;
  className?: string;
}

const Form: React.SFC<IProps> = ({ submitFn, className, children }) => (
  <form
    className={className}
    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitFn();
    }}
  >
    {children}
  </form>
);

export default Form;
