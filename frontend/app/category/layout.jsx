import "../globals.css";

export const metadata = {
  title: "Categories | LearnHealth",
  description: "Browse our vast range of health topics and find information on treatment, prevention and coping strategies and stories.",
};

export default function RootLayout({ children }) {
  return (
    <>
        {children}
   </>
  );
}
