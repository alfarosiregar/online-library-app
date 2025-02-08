import { Skeleton } from "@/components/ui/skeleton";
const SkeletonFragment = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[200px] w-[300px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonFragment;
