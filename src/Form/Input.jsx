import { FormProvider, useForm, useFormContext } from "react-hook-form";

export function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export function Input({ name, component: Component, ...props }) {
  const { register } = useFormContext();
  return <Component {...register(name)} {...props} />;
}
