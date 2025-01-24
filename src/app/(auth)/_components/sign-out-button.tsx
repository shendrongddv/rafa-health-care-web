import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-fit"
    >
      <Button asChild>
        <button type="submit">Sign Out</button>
      </Button>
    </form>
  );
}
