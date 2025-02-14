import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/user.type"; // Pastikan tipe User hanya di sini
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import userServices from "@/services/user";
import { useRouter } from "next/router";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editUser: User | null;
  setEditUser: (user: User | null) => void;
  title: string;
  description: string;
  labelFullname: string;
  labelEmail: string;
};

const EditUserModal = ({
  isOpen,
  onClose,
  editUser,
  setEditUser,
  title,
  description,
  labelFullname,
  labelEmail,
}: ModalProps) => {
  if (!editUser) return null; // Hindari akses properti dari null
  const { reload } = useRouter(); // Inisialisasi router

  const allowedRoles: User["role"][] = ["admin", "member"]; // Tambahkan semua role yang valid
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = {
        fullname: editUser.fullname,
        email: editUser.email,
        role: editUser.role,
      };

      const result = await userServices.updateUser(editUser.id, formData);

      if (result.status === 200) {
        console.log("User updated successfully");
        onClose(); // Tutup modal setelah update sukses
        reload(); // Reload halaman setelah update
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-[90%] sm:max-w-[425px] bg-white p-6 sm:p-8 rounded-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Full Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                {labelFullname}
              </Label>
              <Input
                id="fullname"
                value={editUser.fullname}
                onChange={(e) =>
                  setEditUser({ ...editUser, fullname: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            {/* Email (Disabled) */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                {labelEmail}
              </Label>
              <Input
                id="email"
                value={editUser.email}
                disabled
                className="col-span-3"
              />
            </div>

            {/* Role */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={editUser.role}
                onValueChange={(newRole) => {
                  if (allowedRoles.includes(newRole as User["role"])) {
                    setEditUser({ ...editUser, role: newRole as User["role"] });
                  }
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="flex gap-2 mt-3">
            <Button onClick={onClose} variant="outline" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
