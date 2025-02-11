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

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  editUser: User | null;
  setEditUser: (user: User | null) => void;
  onSave: () => void;
  title: string;
  description: string;
  labelFullname: string;
  labelEmail: string;
  buttonName: string;
};

const Modal = ({
  isOpen,
  onClose,
  editUser,
  setEditUser,
  onSave,
  title,
  description,
  buttonName,
  labelFullname = "Full Name",
  labelEmail = "Email",
}: ModalProps) => {
  if (!editUser) return null; // Hindari akses properti dari null

  const allowedRoles: User["role"][] = ["admin", "member", "editor"];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Full Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-right">
              {labelFullname}
            </Label>
            <Input
              id="fullname"
              value={editUser.fullname}
              onChange={(e) => {
                if (editUser) {
                  setEditUser({ ...editUser, fullname: e.target.value });
                }
              }}
              className="col-span-3"
            />
          </div>

          {/* Email */}
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
            <Input
              id="role"
              value={editUser.role}
              onChange={(e) => {
                const newRole = e.target.value as User["role"];
                if (allowedRoles.includes(newRole) && editUser) {
                  setEditUser({ ...editUser, role: newRole });
                }
              }}
              className="col-span-3"
            />
          </div>
        </div>
        {/* Footer */}
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
