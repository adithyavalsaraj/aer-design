import { cn } from "@/lib/utils";
import * as React from "react";
import { Checkbox } from "./index";

export interface CheckboxOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  align?: "center" | "start" | "end";
}

export interface CheckboxGroupProps {
  /** The list of options to display */
  options: CheckboxOption[];
  /** The currently selected values */
  value: string[];
  /** Callback when selection changes */
  onChange: (value: string[]) => void;
  /** Optional label for the group ("Select All" checkbox text) */
  label?: React.ReactNode;
  /** Whether to show the "Select All" checkbox. Default: true */
  enableSelectAll?: boolean;
  /** Class name for the container */
  className?: string;
  /** Class name for the group label/parent checkbox */
  labelClassName?: string;
  /** Class name for the list container */
  listClassName?: string;
  /** Orientation of the list */
  orientation?: "horizontal" | "vertical";
  /** Alignment of checkboxes */
  align?: "center" | "start" | "end";
}

const CheckboxGroup = ({
  options,
  value = [],
  onChange,
  label = "Select All",
  enableSelectAll = true,
  className,
  labelClassName,
  listClassName,
  orientation = "vertical",
  align = "start",
}: CheckboxGroupProps) => {
  const enabledOptions = options.filter((opt) => !opt.disabled);
  const enabledValues = enabledOptions.map((opt) => opt.value);

  // Calculate potential new values strictly from what's currently selected + enabled options
  // We don't want to mess solely with selected values that might not be in the options list
  // (though usually they should match).

  const allEnabledSelected = enabledOptions.every((opt) =>
    value.includes(opt.value)
  );
  const someEnabledSelected = enabledOptions.some((opt) =>
    value.includes(opt.value)
  );
  const isIndeterminate = someEnabledSelected && !allEnabledSelected;

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      // Select all enabled options
      // Merge current value with enabledValues, avoiding duplicates
      const newValue = Array.from(new Set([...value, ...enabledValues]));
      onChange(newValue);
    } else {
      // Deselect all enabled options
      const newValue = value.filter((val) => !enabledValues.includes(val));
      onChange(newValue);
    }
  };

  const handleOptionChange = (
    optionValue: string,
    checked: boolean | "indeterminate"
  ) => {
    if (checked === true) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((val) => val !== optionValue));
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {enableSelectAll && (
        <div className={cn("border-b pb-3 mb-1", labelClassName)}>
          <Checkbox
            checked={
              allEnabledSelected
                ? true
                : isIndeterminate
                ? "indeterminate"
                : false
            }
            onCheckedChange={handleSelectAll}
            label={label}
            align={align}
          />
        </div>
      )}
      <div
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          listClassName
        )}
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            checked={value.includes(option.value)}
            onCheckedChange={(checked) =>
              handleOptionChange(option.value, checked)
            }
            label={option.label}
            disabled={option.disabled}
            align={option.align || align}
          />
        ))}
      </div>
    </div>
  );
};

export { CheckboxGroup };
