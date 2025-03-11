import LoginView from "@/components/views/auth/login";
import { ReCaptchaProvider } from "next-recaptcha-v3";

const LoginPage = () => {
  return (
    <ReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_SITE_KEY_RECAPTCHA}
    >
      <LoginView />
    </ReCaptchaProvider>
  );
};

export default LoginPage;
