import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NameInputPage from "./pages/NameInputPage"; // Import the new NameInputPage
import SessionDetail from "./pages/SessionDetail";
import LessonDetail from "./pages/LessonDetail";
import AdminDashboard from "./pages/AdminDashboard";
import SessionManagement from "./pages/admin/SessionManagement";
import LessonManagement from "./pages/admin/LessonManagement";
import QuizManagement from "./pages/admin/QuizManagement";
import QuestionManagement from "./pages/admin/QuestionManagement";
// UserManagement is removed as it relies on Supabase Auth profiles
import { ThemeProvider } from "next-themes";
import { getLocalUser } from "./utils/localUser"; // Import local user utility

const queryClient = new QueryClient();

// Component to check for local user and redirect if not found
const UserCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const localUser = getLocalUser();
  return localUser ? <>{children}</> : <Navigate to="/enter-name" replace />;
};

// AdminRoute component to protect admin routes based on local user name
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const localUser = getLocalUser();
  // Simple local check: user is admin if their name is "Admin"
  const isAdmin = localUser?.name === "Admin";

  if (!localUser) {
    return <Navigate to="/enter-name" replace />;
  }

  return isAdmin ? <>{children}</> : <Navigate to="/" replace />; // Redirect non-admins to home
};

const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enter-name" element={<NameInputPage />} />
        <Route path="*" element={<UserCheck><AppRoutes /></UserCheck>} />
      </Routes>
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/sessions/:sessionId" element={<SessionDetail />} />
      <Route path="/lessons/:lessonId" element={<LessonDetail />} />

      {/* Admin Routes - now protected by local name check */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/curriculum/sessions" element={<AdminRoute><SessionManagement /></AdminRoute>} />
      <Route path="/admin/curriculum/sessions/:sessionId/lessons" element={<AdminRoute><LessonManagement /></AdminRoute>} />
      <Route path="/admin/curriculum/quizzes" element={<AdminRoute><QuizManagement /></AdminRoute>} />
      <Route path="/admin/curriculum/quizzes/:quizId/questions" element={<AdminRoute><QuestionManagement /></AdminRoute>} />
      {/* UserManagement removed as it relies on Supabase Auth profiles */}

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;