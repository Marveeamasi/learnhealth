import "./globals.css";

export const metadata = {
  title: "Welcome | LearnHealth",
  description: "Your guide to Wellness and a Healthy life.",
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
