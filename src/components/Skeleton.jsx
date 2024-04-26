const Skeleton = () => {
  return (
    <div className="p-5 bg-form mb-7 rounded-xl shadow-md dark:shadow-dark w-[350px] md:w-[600px]">
      <div className="h-8 bg-gray-300 dark:bg-gray-800 rounded-full animate-pulse mb-5"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded-full animate-pulse mb-3 col-span-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded-full animate-pulse mb-3"></div>
      </div>
      <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded-full animate-pulse mb-3"></div>
    </div>
  );
};
export default Skeleton;
