import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { Input, InputProps } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(CustomParseFormat);
dayjs.extend(LocalizedFormat);

const defaultLocale = dayjs.locale();

type DateInputProps = Omit<InputProps, "value"> & {
  value: Date | string;
  onChange: any;
  locales?: string;
  format?: string;
};

export const DateInput: React.FC<DateInputProps> = ({
  locales,
  format: dateFormat = "L",
  value,
  onChange,
  ...props
}) => {
  const isDate = value instanceof Date;
  const date = isDate ? dayjs(value) : dayjs(value, "YYYY-MM-DD", true);
  const str =
    isDate || date.isValid() ? date.locale(locales || defaultLocale).format(dateFormat) : value;

  const [state, setState] = useState<string>(str);
  useEffect(() => {
    setState((current) => {
      return current && str === "Invalid Date" && current !== str ? current : str;
    });
  }, [str]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState(value);

    const day = dayjs(value, dateFormat, locales || defaultLocale, true);
    const date = value === "" ? null : day.toDate();
    console.log(date);
    onChange(date);
  };

  return <Input value={state || ""} onChange={handleChange} {...props} />;
};
