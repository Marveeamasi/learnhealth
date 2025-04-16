import "./globals.css";

export const metadata = {
  title: "Video Dual",
  description: "Your Number 1 Video Dual App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
