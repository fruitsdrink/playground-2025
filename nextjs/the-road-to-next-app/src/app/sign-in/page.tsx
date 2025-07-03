import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/paths";

export default function SignUpPage() {
  return (
    <main className="w-full flex-1 flex justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account."
        content={<SignInForm />}
        className="w-full max-w-[420px] self-center animate-fade-in-from-top"
        footer={
          <div className="flex justify-between w-full">
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No Account yet?
            </Link>
            <Link
              className="text-sm text-muted-foreground"
              href={passwordForgotPath()}
            >
              Forgot Password?
            </Link>
          </div>
        }
      />
    </main>
  );
}
