import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-4xl mx-auto w-full">
        <AuthForm type="login" />
      </div>
    </div>
  );
}
