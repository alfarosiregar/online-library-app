import Image from "next/image";

const Development = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen w-full">
      <h1 className="text-2xl font-bold">Development User Page</h1>
      <Image
        src="/development-user.png"
        alt="development"
        width={500}
        height={500}
      />
      <h5 className="text-lg font-bold text-center">
        Sorry this page is under development
      </h5>
    </div>
  );
};

export default Development;
