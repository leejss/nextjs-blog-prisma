import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <AuthForm type="register" />
    </div>
  );
}
