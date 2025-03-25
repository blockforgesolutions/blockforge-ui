import "./globals.css";

export const metadata = {
  title: "My App",
  description: "A simple app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}