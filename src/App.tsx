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
import PhaseManagement from "./pages/admin/PhaseManagement";
import ModuleManagement from "./pages/admin/ModuleManagement";
import LessonManagement from "./pages/admin/LessonManagement";
import QuizManagement from "./pages/admin/QuizManagement"; // Import QuizManagement
import QuestionManagement from "./pages/admin/QuestionManagement"; // Import QuestionManagement
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
              <Route path="/admin/curriculum/phases" element={<PhaseManagement />} />
              <Route path="/admin/curriculum/phases/:phaseId/modules" element={<ModuleManagement />} />
              <Route path="/admin/curriculum/phases/:phaseId/modules/:moduleId/lessons" element={<LessonManagement />} />
              <Route path="/admin/curriculum/quizzes" element={<QuizManagement />} /> {/* New Quiz Management Route */}
              <Route path="/admin/curriculum/quizzes/:quizId/questions" element={<QuestionManagement />} /> {/* New Question Management Route */}
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