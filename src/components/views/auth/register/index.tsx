import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import authService from "@/services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";
import Image from "next/image";

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    phone: "",
    gender: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.registerAccount(formData);

      if (result.status === 200) {
        push("../auth/login");
      } else {
        setError("Email already exists");
      }
    } catch (err: any) {
      setError("Email sudah terdaftar");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:px-8 lg:px-16">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <Card className="flex flex-col justify-center p-4 md:p-12 w-full max-w-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl">Register</CardTitle>
            <CardDescription>Buat akun untuk mulai membaca</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="py-6"
                  placeholder="Masukkan email anda"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullname">Nama Lengkap</Label>
                <Input
                  id="fullname"
                  name="fullname"
                  className="py-6"
                  placeholder="Masukkan nama lengkap anda"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="py-6"
                  placeholder="Masukkan nomor telepon anda"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Jenis Kelamin</Label>
                <Select onValueChange={handleGenderChange} required>
                  <SelectTrigger className="py-6">
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Laki-Laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="py-6"
                  placeholder="Buat password anda"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button
                type="submit"
                className="w-full py-6"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Daftar"}
              </Button>
              {error && (
                <CardDescription className="text-center text-red-500 font-semibold">
                  {error}
                </CardDescription>
              )}
              <CardDescription className="text-center">
                Sudah punya akun?{" "}
                <Link
                  href="../auth/login"
                  className="font-semibold text-gray-500 hover:text-gray-900"
                >
                  Login
                </Link>
              </CardDescription>
            </CardFooter>
          </form>
        </Card>
        <div className="hidden lg:flex w-full items-center justify-center">
          <Image
            src="/register.png"
            alt="Login Illustration"
            width={800}
            height={600}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
