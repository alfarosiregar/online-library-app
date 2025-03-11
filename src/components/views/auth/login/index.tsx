import { useRef, useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

export default function LoginView() {
  const { push, query } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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

    const token = recaptchaRef.current?.getValue();
    if (!token) return setMessage("reCAPTCHA diperlukan");

    const response = await axios.post("/api/verify-recaptcha", { token });
    if (response.data.success) {
      setMessage("Verifikasi berhasil!");
    } else {
      setMessage("Verifikasi gagal!");
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
                  className="py-6 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="relative space-y-1">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-6 pr-10 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Login Sebagai</Label>
                <Select onValueChange={setRole} required>
                  <SelectTrigger className="py-6 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Pilih " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_SITE_KEY_RECAPTCHA_V2 || ""}
                ref={recaptchaRef}
              />
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
