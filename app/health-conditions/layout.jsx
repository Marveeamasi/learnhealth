import "../globals.css";

export const metadata = {
  title: "Health Conditions | LearnHealth",
  description: "Browse our vast range of health conditions and find information on treatment, prevention and coping strategies and stories.",
};

export default function RootLayout({ children }) {
  return (
    <>
        {children}
   </>
  );
}
