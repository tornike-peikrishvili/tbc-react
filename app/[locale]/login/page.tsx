import LoginForm from "@/components/login/LoginForm";
import { getScopedI18n } from "@/locales/server";

async function LoginPage() {
  const scopedT = await getScopedI18n("login");
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-3xl font-bold mb-4 text-center">
          {scopedT("logIn")}
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
