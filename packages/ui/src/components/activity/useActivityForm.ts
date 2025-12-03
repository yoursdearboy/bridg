import type { PerformedActivityUnion } from "api-ts";
import { useState } from "react";

export default (activity: PerformedActivityUnion) => {
  const [state, setState] = useState(activity);
  const handleSubmit =
    (submitFn: (activity: PerformedActivityUnion) => void) =>
    (e?: React.FormEvent) => {
      if (e?.preventDefault) e.preventDefault();
      submitFn(state);
    };
  return { state, setState, onChange: setState, handleSubmit };
};
