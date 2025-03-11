import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Camera, Phone } from "lucide-react";

interface ProfileData {
  fullname: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

interface ProfileFormProps {
  userData: ProfileData; // Data user yang bisa berubah dari luar
  onSubmit: (data: ProfileData) => void;
  isLoading: boolean;
}

export default function ProfileForm({
  userData,
  onSubmit,
  isLoading,
}: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileData>(userData);

  // Sync formData dengan userData saat userData berubah
  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="avatar">Profile Picture</Label>
        <div className="mt-1 flex items-center">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            <img
              src={formData.avatarUrl || "/placeholder.svg"}
              alt="Avatar"
              className="object-cover"
            />
          </span>
          <label
            htmlFor="avatar-upload"
            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-all"
          >
            <Camera className="h-4 w-4 inline-block mr-2" />
            Change
          </label>
          <input
            id="avatar-upload"
            name="avatarUrl"
            type="file"
            className="sr-only"
            onChange={handleAvatarChange}
            accept="image/*"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="fullname">Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="pl-10"
            placeholder="Your name"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="pl-10"
            placeholder="Your email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            className="pl-10"
            placeholder="Your phone"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full hover:shadow-lg transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
