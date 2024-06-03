export default function FormInput({
  value,
  onChange,
  label,
  type = "text",
  className,
}: {
  value: any;
  onChange: (e:any) => any;
  label: string;
  type: "text" | "password";
  className?: string;
}) {
  return (
    <label className={"flex flex-col gap-3 " + className}>
      <span className="font-medium">{label ?? "Label"}</span>
      <input
        type={type}
        className="w-full bg-[#f3f3f3]/80 focus:bg-[#f3f3f3] py-4 px-6 rounded-[10px] focus:outline-none "
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
