

function MovementAddSkeleton() {
  return (
    <div className="grid grid-cols-6 gap-3">

      <div className="flex flex-col col-span-2">
        <div className="h-8 skeleton rounded w-24 mb-2"></div>
        <div className="h-12 skeleton rounded"></div>
        <div className="h-6"></div>
      </div>


      <div className="flex flex-col col-span-2">
        <div className="h-8 skeleton rounded w-32 mb-2"></div>
        <div className="h-12 skeleton rounded"></div>
        <div className="h-6"></div>
      </div>
      <div className="flex flex-col col-span-2">
        <div className="h-8 skeleton rounded w-32 mb-2"></div>
        <div className="h-12 skeleton rounded"></div>
        <div className="h-6"></div>
      </div>



      <div className="flex flex-col w-full col-span-4">
        <div className="h-8 skeleton rounded w-24 mb-2"></div>
        <div className="h-12 skeleton rounded w-full"></div>
        <div className="h-6"></div>
      </div>
      <div className="flex flex-col w-full col-span-2">
        <div className="h-8 skeleton rounded w-24 mb-2"></div>
        <div className="h-12 skeleton rounded w-full"></div>
        <div className="h-6"></div>
      </div>

      <div className="flex justify-center col-span-6 items-center">
        <div className="h-12 skeleton rounded w-32"></div>
        <div className="h-6"></div>
      </div>
    </div>
  );
}

export default MovementAddSkeleton
