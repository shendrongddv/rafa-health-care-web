import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./_components/profile-form";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";

export default async function ProfilePage() {
  const session = await auth();

  let profile = null;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });
    profile = user?.profile
      ? Object.fromEntries(
          Object.entries(user.profile).map(([key, value]) => [
            key,
            value === null ? undefined : value,
          ])
        )
      : undefined;
  }

  return (
    <div className="container px-4 py-8">
      <Toaster position="top-center" />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and personal information.
          </p>
        </div>

        <Separator />

        <div className="max-w-3xl">
          <ProfileForm initialData={profile ?? undefined} />
        </div>
      </div>
    </div>
  );
}
