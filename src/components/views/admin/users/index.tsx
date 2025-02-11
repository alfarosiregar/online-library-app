import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search } from "lucide-react";
import AdminLayout from "@/components/layouts/AdminLayout";
import Modal from "@/components/fragments/Modal";

type User = {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  role: string;
  type: string;
};

type PropsType = {
  users: User[];
};

const AdminUsersView = ({ users }: PropsType) => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedData, setSortedData] = useState<User[]>(users || []);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSortedData(users || []);
  }, [users]);

  const handleSort = () => {
    const sorted = [...sortedData].sort((a, b) =>
      sortOrder === "asc"
        ? a.fullname.localeCompare(b.fullname)
        : b.fullname.localeCompare(a.fullname),
    );
    setSortedData(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredData = sortedData.filter((user) =>
    user.fullname?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEditUser = (id: string) => {
    const userToEdit = users.find((user) => user.id === id) || null;
    setEditUser(userToEdit);
    setIsModalOpen(!!userToEdit);
  };

  return (
    <AdminLayout>
      <div className="p-10 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Management
        </h1>
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-y-3">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name..."
              className="pl-10 w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full min-w-[700px] border border-gray-200">
              <TableHeader className="bg-gray-200 text-white">
                <TableRow>
                  <TableHead className="p-3 text-left">#</TableHead>
                  <TableHead className="p-3 text-left">
                    <div className="flex items-center gap-2">
                      Full Name
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleSort}
                      >
                        <ArrowUpDown className="h-4 w-4 text-black" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead className="p-3 text-left">Email</TableHead>
                  <TableHead className="p-3 text-left">Phone</TableHead>
                  <TableHead className="p-3 text-left">Role</TableHead>
                  <TableHead className="p-3 text-left">Type</TableHead>
                  <TableHead className="p-3 text-left">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className={`text-sm md:text-base ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100 transition-all`}
                    >
                      <TableCell className="p-3">{index + 1}</TableCell>
                      <TableCell className="p-3">{user.fullname}</TableCell>
                      <TableCell className="p-3">{user.email}</TableCell>
                      <TableCell className="p-3">{user.phone || "-"}</TableCell>
                      <TableCell className="p-3">{user.role}</TableCell>
                      <TableCell className="p-3">{user.type}</TableCell>
                      <TableCell className="p-3 flex gap-2">
                        <Button onClick={() => handleEditUser(user.id)}>
                          Edit
                        </Button>
                        <Button variant={"destructive"}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-4 text-gray-600"
                    >
                      {users.length === 0 ? "Loading..." : "No users found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal untuk Edit User */}
      {editUser && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editUser={editUser}
          setEditUser={setEditUser}
          onSave={() => {
            console.log("Save user:", editUser);
            setIsModalOpen(false);
          }}
          title="Edit User"
          description="Make changes to your profile here. Click save when you're done."
          labelFullname="Full Name"
          labelEmail="Email"
          buttonName="Save"
        />
      )}
    </AdminLayout>
  );
};

export default AdminUsersView;
