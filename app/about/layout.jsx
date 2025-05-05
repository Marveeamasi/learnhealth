import "../globals.css";

export const metadata = {
  title: "About | LearnHealth",
  description: `We believe that everyone deserves access to 
high-quality health information, regardless of their background 
or experience. Our goal is to provide clear, accurate, and 
actionable content that helps you take control of your health.`,
};

export default function RootLayout({ children }) {
  return (
    <>
        {children}
   </>
  );
}
