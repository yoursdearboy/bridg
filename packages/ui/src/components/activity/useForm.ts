import { useState } from "react";

export default <T>(initialState: T) => {
  const [state, setState] = useState(initialState);
  const handleSubmit =
    (submitFn: (activity: T) => void) => (e?: React.FormEvent) => {
      if (e?.preventDefault) e.preventDefault();
      submitFn(state);
    };
  return { state, setState, onChange: setState, handleSubmit };
};
