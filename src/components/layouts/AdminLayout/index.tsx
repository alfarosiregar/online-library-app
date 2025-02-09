import Sidebar from "@/components/fragments/Sidebar";

type PropsType = {
  children: React.ReactNode;
};

export default function AdminLayout(props: PropsType) {
  const { children } = props;
  return (
    <div className="flex h-screen">
      <Sidebar />
      {children}
    </div>
  );
}
