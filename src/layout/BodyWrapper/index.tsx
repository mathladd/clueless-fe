export default function BodyWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}
