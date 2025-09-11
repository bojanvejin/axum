import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login"; // Import the new Login page
import SessionDetail from "./pages/SessionDetail"; // New SessionDetail page
import LessonDetail from "./pages/LessonDetail";
import AdminDashboard from "./pages/AdminDashboard";
import SessionManagement from "./pages/admin/SessionManagement"; // New SessionManagement
import LessonManagement from "./pages/admin/LessonManagement"; // Updated LessonManagement
import QuizManagement from "./pages/admin/QuizManagement";
import QuestionManagement from "./pages/admin/QuestionManagement";
import UserManagement from "./pages/admin/UserManagement"; // Re-adding UserManagement for admin roles
import { ThemeProvider } from "next-themes";
import { SessionContextProvider, useSession } from "./components/SessionContextProvider"; // Import SessionContextProvider and useSession

const queryClient = new QueryClient();

// PrivateRoute component to protect routes
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useSession();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  return session ? <>{children}</> : <Navigate to="/login" replace />;
};

// AdminRoute component to protect admin routes
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading, isAdmin } = useSession();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? <>{children}</> : <Navigate to="/" replace />; // Redirect non-admins to home
};

const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PrivateRoute><AppRoutes /></PrivateRoute>} />
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

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/curriculum/sessions" element={<AdminRoute><SessionManagement /></AdminRoute>} />
      <Route path="/admin/curriculum/sessions/:sessionId/lessons" element={<AdminRoute><LessonManagement /></AdminRoute>} />
      <Route path="/admin/curriculum/quizzes" element={<AdminRoute><QuizManagement /></AdminRoute>} />
      <Route path="/admin/curriculum/quizzes/:quizId/questions" element={<AdminRoute><QuestionManagement /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} /> {/* Re-added UserManagement */}

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
        <SessionContextProvider>
          <AppContent />
        </SessionContextProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;