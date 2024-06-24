import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";

function TicketIcon() {
  return (
    <Link
      href={"/cart"}
      className="mt-2 flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-gray-100"
    >
      <FaTicketAlt className=" h-5 w-5  text-blue-500" size={32} />
    </Link>
  );
}

export default TicketIcon;
