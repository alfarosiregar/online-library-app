import LoginView from "@/components/views/auth/login";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginView />
      </div>
    </div>
  );
};

export default LoginPage;
