import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Button = ({
  link,
  label,
  className = "",
}: {
  link: string;
  label: string;
  className?: string;
}) => {
  return (
    <Link
      href={link}
      className={
        "inline-flex items-center font-medium bg-gradient-to-r from-sky-500 to-green-600 text-white px-8 py-2 rounded-full transition-all self-start hover:bg-gradient-to-l hover:from-sky-600 hover:to-green-700 active:scale-95 ease-in-out duration-300 shadow-md " +
        className
      }
    >
      {label}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
};

export default Button;
