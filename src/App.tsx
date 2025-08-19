import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PhaseDetail from "./pages/PhaseDetail";
import ModuleDetail from "./pages/ModuleDetail";
import LessonDetail from "./pages/LessonDetail";
import AdminDashboard from "./pages/AdminDashboard";
import PhaseManagement from "./pages/admin/PhaseManagement"; // Import PhaseManagement
import { ThemeProvider } from "next-themes";
import { SessionContextProvider } from "./components/SessionContextProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SessionContextProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/phases/:phaseId" element={<PhaseDetail />} />
              <Route path="/phases/:phaseId/modules/:moduleId" element={<ModuleDetail />} />
              <Route path="/lessons/:lessonId" element={<LessonDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/curriculum/phases" element={<PhaseManagement />} /> {/* New Phase Management Route */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SessionContextProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;