import Sidebar from "@/components/fragments/Sidebar";
import { useState, useEffect } from "react";

type PropsType = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: PropsType) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize(); // Set saat pertama kali
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row h-screen w-full overflow-hidden">
      {/* Sidebar untuk desktop, Bottom navigation untuk mobile */}
      {!isMobile ? (
        <div
          className={`transition-all duration-300 z-50 ${
            isExpanded ? "w-[250px]" : "w-[80px]"
          }`}
        >
          <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
      ) : (
        <div className="fixed bottom-0 w-full bg-gray-900 text-white z-50 shadow-lg">
          <Sidebar isExpanded={true} setIsExpanded={() => {}} />
        </div>
      )}

      {/* Konten utama */}
      <main className="w-full flex-1 px-5 pt-5 sm:ml-0 sm:pt-10">
        {children}
      </main>
    </div>
  );
}
