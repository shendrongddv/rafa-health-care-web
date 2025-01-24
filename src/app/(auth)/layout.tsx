const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
