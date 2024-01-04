import Input, { InputProps } from "./input";

export default function AmountInput(props: InputProps) {
  return (
    <div className="flex items-center bg-blue-950 border border-white/10 rounded-lg overflow-hidden">
      <Input
        placeholder=" Amount"
        className="border-0 w-24 pl-4 bg-transparent text-"
        value={props.value}
        onChange={props.onChange}
      />
      <span className="text-white/50 px-4 ">USD</span>
    </div>
  );
}
