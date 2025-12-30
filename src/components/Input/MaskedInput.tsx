import * as React from "react";
import { Input, type InputProps } from "./Input";

export interface MaskedInputProps extends Omit<InputProps, "onChange"> {
  mask: string; // e.g., "#### #### #### ####"
  onChange?: (value: string) => void;
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onChange, value: propsValue = "", ...props }, ref) => {
    const [value, setValue] = React.useState(propsValue as string);

    React.useEffect(() => {
      setValue(propsValue as string);
    }, [propsValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      let newValue = "";
      let i = 0;
      let j = 0;

      const rawInput = input.replace(/[^a-zA-Z0-9]/g, "");

      while (i < mask.length && j < rawInput.length) {
        if (mask[i] === "#") {
          if (/\d/.test(rawInput[j])) {
            newValue += rawInput[j];
            j++;
          }
          i++;
        } else if (mask[i] === "A") {
          if (/[a-zA-Z]/.test(rawInput[j])) {
            newValue += rawInput[j];
            j++;
          }
          i++;
        } else {
          newValue += mask[i];
          if (rawInput[j] === mask[i]) {
            j++;
          }
          i++;
        }
      }

      setValue(newValue);
      onChange?.(newValue);
    };

    return (
      <Input
        {...props}
        value={value}
        onChange={handleChange}
        ref={ref}
        placeholder={
          props.placeholder || mask.replace(/#/g, "0").replace(/A/g, "X")
        }
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";
