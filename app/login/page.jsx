import LoginForm from "@/components/login/LoginForm";

async function LoginPage() {

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-3xl font-bold mb-4 text-center">Loginie</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
