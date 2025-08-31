import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Toaster } from "sonner";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {children}
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        richColors
        closeButton
      />
    </>
  );
}
