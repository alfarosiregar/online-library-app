import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

export default function LoginView() {
  const { push, query } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl =
    typeof query.callbackUrl === "string" ? query.callbackUrl : "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        role,
        callbackUrl,
      });

      if (!res?.error) {
        push(callbackUrl);
      } else {
        setError("Email or password is incorrect");
      }
    } catch (_err) {
      setError("Email or password is incorrect");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 md:px-8 lg:px-16">
      <div className="w-full min-w-2xl grid grid-cols-1 lg:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section */}
        <Card className="flex flex-col justify-center p-2 md:p-12 w-full max-w-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Login Sebagai</Label>
                <Select onValueChange={setRole} required>
                  <SelectTrigger className="py-6">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full p-6" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
            <Button
              type="button"
              className="w-full bg-white hover:bg-gray-100 text-black border border-gray-300 p-6"
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Login with
              Google
            </Button>
            {error && (
              <CardDescription className="text-center text-red-500 font-semibold">
                {error}
              </CardDescription>
            )}
            <CardDescription className="text-center">
              Belum punya akun?{" "}
              <Link
                href="../auth/register"
                className="font-semibold text-gray-500 hover:text-gray-900"
              >
                Register
              </Link>
            </CardDescription>
          </CardContent>
        </Card>
        {/* Image Section */}
        <div className="hidden lg:flex w-full items-center justify-center">
          <Image
            src="/login.png"
            alt="Login Illustration"
            width={800}
            height={600}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
