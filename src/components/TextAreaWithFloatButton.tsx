import { Button, Input } from "antd";

type TextAreaWithFloatButtonProps = {
  buttonText?: string;
  buttonProps?: React.ComponentProps<typeof Button>;
} & React.ComponentProps<typeof Input.TextArea>;

const TextAreaWithFloatButton: React.FunctionComponent<
  TextAreaWithFloatButtonProps
> = ({ buttonText, buttonProps, ...props }) => {
  return (
    <div className="textarea-with-float-button">
      <Input.TextArea {...props} />
      <Button {...buttonProps}>{buttonText}</Button>
    </div>
  );
};

export default TextAreaWithFloatButton;
