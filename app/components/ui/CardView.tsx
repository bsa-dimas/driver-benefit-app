import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default function CardView({
  title,
  valueBeforePeriod,
  value,
  type,
}: {
  title: string;
  valueBeforePeriod: number | string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="relative bg-gray-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-900" /> : null}
        <h3 className="ml-2 text-xs font-medium">{title}</h3>
      </div>
      <div className="px-4 py-8 dark:bg-gray-900 dark:border-gray-500 bg-white  truncate rounded-xl ">
        <p className="text-center text-xs">{valueBeforePeriod}</p>
        <p className="text-center text-2xl">{value}</p>
      </div>
    </div>
  );
}
