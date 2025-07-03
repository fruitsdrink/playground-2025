import Link from "next/link";
import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";

export default function SignUpPage() {
  return (
    <main className="w-full flex-1 flex justify-center items-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started."
        content={<SignUpForm />}
        className="w-full max-w-[420px] self-center animate-fade-in-from-top"
        footer={
          <Link className="text-sm text-muted-foreground" href={signInPath()}>
            Already have an account? Sign In now.
          </Link>
        }
      />
    </main>
  );
}
