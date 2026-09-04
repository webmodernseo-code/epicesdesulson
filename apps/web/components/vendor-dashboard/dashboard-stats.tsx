const STATS_DATA = [
  {
    id: 1,
    label: "Total Orders",
    value: "18,765",
    icon: "hgi-delivery-box-02",
    bgColor: "bg-[rgba(145,158,171,0.08)]",
  },
  {
    id: 2,
    label: "Total Sales",
    value: "20,300",
    icon: "hgi-analytics-up",
    bgColor: "bg-[rgba(145,158,171,0.08)]",
  },
  {
    id: 3,
    label: "Order Pending",
    value: "200",
    icon: "hgi-hourglass",
    bgColor: "bg-[rgba(145,158,171,0.08)]",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-12 mb-6 gap-6">
      {STATS_DATA.map((stat) => (
        <div
          key={stat.id}
          className="xl:col-span-4 lg:col-span-6 col-span-12 border border-gray-300 rounded-2xl p-6 flex items-center gap-x-6 bg-white  transition-shadow duration-300"
        >
          <div
            className={`size-[72px] rounded-full ${stat.bgColor} inline-flex justify-center items-center flex-none`}
          >
            <i
              className={`hgi hgi-stroke ${stat.icon} text-[32px] leading-8 text-light-primary-text font-normal`}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm leading-[22px] text-light-disabled-text font-semibold uppercase tracking-wider">
              {stat.label}
            </p>
            <h4 className="text-2xl font-bold text-light-primary-text">
              {stat.value}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
