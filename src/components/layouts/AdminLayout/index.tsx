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
        className={`transition-all duration-300 flex-1 px-10 py-0 ${
          isExpanded ? "sm:ml-[10px] m-8" : "sm:ml-[30px] m-5"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
