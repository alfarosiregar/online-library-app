import Sidebar from "@/components/fragments/Sidebar";
import { useState } from "react";

type PropsType = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: PropsType) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={`absolute sm:relative z-50 transition-all duration-300 ${
          isExpanded ? "w-[250px] " : "w-0 sm:w-[30px]"
        }`}
      >
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>

      {/* Konten utama */}
      <main
        className={`w-full transition-all duration-300 flex-1 px-5 ${
          isExpanded ? "sm:ml-[10px] m-10" : "sm:ml-[40px] m-5 ml-10"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
