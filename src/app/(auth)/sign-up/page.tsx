import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SocialButton } from "../_components/sign-in-button";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Nice to Meet You</CardTitle>
          <CardDescription>
            Register with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SocialButton />

          {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-sm text-muted-foreground">
              or continue with
            </span>
          </div>
          <RegisterForm /> */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default SignUpPage;
