// app/(auth)/account/layout.tsx
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}
