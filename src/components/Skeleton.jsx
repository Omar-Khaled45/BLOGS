const Skeleton = () => {
  return (
    <div className="mb-7 w-[350px] rounded-xl bg-form p-5 shadow-md md:w-[600px] dark:shadow-dark">
      <div className="mb-5 h-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-800"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 mb-3 h-4 animate-pulse rounded-full bg-gray-300 dark:bg-gray-800"></div>
        <div className="mb-3 h-4 animate-pulse rounded-full bg-gray-300 dark:bg-gray-800"></div>
      </div>
      <div className="mb-3 h-4 animate-pulse rounded-full bg-gray-300 dark:bg-gray-800"></div>
    </div>
  );
};
export default Skeleton;
