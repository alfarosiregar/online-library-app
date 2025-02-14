import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/types/user.type";
import userServices from "@/services/user";

type DeleteUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  deletedUser: User | null;
  setDeletedUser: (user: User | null) => void;
};

const DeleteUserModal = ({
  isOpen,
  onClose,
  deletedUser,
  setDeletedUser,
}: DeleteUserModalProps) => {
  if (!deletedUser) return null; // Hindari akses null
  const [isLoading, setIsLoading] = useState(false);
  const { reload } = useRouter(); // Untuk reload halaman setelah delete

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await userServices.deleteUser(deletedUser.id);
      if (response.status === 200) {
        console.log("User deleted successfully");
        setDeletedUser(null); // Reset user setelah delete
        onClose(); // Tutup modal
        reload(); // Refresh halaman
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-[90%] sm:max-w-[425px] bg-white p-6 sm:p-8 rounded-lg">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <strong>{deletedUser?.fullname}</strong>? <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 mt-3">
          <Button onClick={onClose} variant="outline" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
