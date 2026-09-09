import "./globals.css";

export const metadata = {
  title: "DukaanSe - Product Management Dashboard",
  description: "Responsive Product Dashboard built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}