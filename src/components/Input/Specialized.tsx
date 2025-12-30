import { Mail, Phone } from "lucide-react";
import * as React from "react";
import { Input, type InputProps } from "./Input";

const EmailInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <Input type="email" startIcon={<Mail />} ref={ref} {...props} />;
  }
);
EmailInput.displayName = "EmailInput";

const PhoneInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <Input type="tel" startIcon={<Phone />} ref={ref} {...props} />;
  }
);
PhoneInput.displayName = "PhoneInput";

export { EmailInput, PhoneInput };
