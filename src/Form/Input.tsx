import { useFormContext } from "react-hook-form";

export function Input({ name, component: Component, setValueAs, ...props }: any) {
  const { register } = useFormContext();
  return <Component {...register(name, { setValueAs })} {...props} />;
}
