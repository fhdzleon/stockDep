export const TableListSkeleton = () => {
  const array = Array.from({ length: 10 });
  return (
    <div className="">
      {array.map((_, index) => (
        <ItemSkeleton key={index} />
      ))}
    </div>
  );
}

export const ItemSkeleton = () => {
  return (
    <div className="grid grid-cols-5 h-12 gap-5 items-center">
      <div className="skeleton h-5 w-full"></div>
      <div className="skeleton h-5 w-full"></div>
      <div className="skeleton h-5 w-full"></div>
      <div className="skeleton h-5 w-full"></div>
      <div className="skeleton h-5 w-full"></div>
    </div>
  );
}
