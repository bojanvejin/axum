import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SimpleLogin from "./pages/SimpleLogin"; // Use SimpleLogin
import PhaseDetail from "./pages/PhaseDetail";
import ModuleDetail from "./pages/ModuleDetail";
import LessonDetail from "./pages/LessonDetail";
import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "./contexts/AuthContext"; // Use AuthContextProvider
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <AuthContextProvider> {/* Use AuthContextProvider */}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/simple-login" element={<SimpleLogin />} /> {/* New login route */}
                <Route path="/phases/:phaseId" element={<PhaseDetail />} />
                <Route path="/phases/:phaseId/modules/:moduleId" element={<ModuleDetail />} />
                <Route path="/lessons/:lessonId" element={<LessonDetail />} />
                {/* Admin routes are removed */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthContextProvider>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;