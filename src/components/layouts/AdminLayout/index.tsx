import Sidebar from "@/components/fragments/Sidebar";
import { useState } from "react";

type PropsType = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: PropsType) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Konten utama menyesuaikan sidebar */}
      <main
        className={`transition-all duration-300 flex-1 p-6 ${
          isExpanded ? "ml-[250px]" : "ml-[80px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
