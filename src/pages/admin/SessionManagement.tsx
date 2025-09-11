import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumSession } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError, showSuccess } from '@/utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, ListChecks, ArrowLeft } from 'lucide-react';
import { getLocalUser } from '@/utils/localUser'; // Import local user utility
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SessionForm from '@/components/admin/SessionForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const SessionManagement: React.FC = () => {
  const localUser = getLocalUser();
  const navigate = useNavigate();
  const isAdmin = localUser?.name === "Admin"; // Simple local admin check

  const [sessions, setSessions] = useState<CurriculumSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<CurriculumSession | null>(null);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('session_number', { ascending: true });

      if (error) throw error;
      setSessions(data || []);
    } catch (error: any) {
      showError(`Failed to load sessions: ${error.message}`);
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localUser) {
      navigate('/enter-name');
      return;
    }
    if (isAdmin) {
      fetchSessions();
    } else {
      navigate('/'); // Redirect non-admins
    }
  }, [localUser, isAdmin, navigate]);

  const handleDeleteSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', sessionId);

      if (error) throw error;
      showSuccess('Session deleted successfully!');
      fetchSessions();
    } catch (error: any) {
      showError(`Failed to delete session: ${error.message}`);
      console.error('Error deleting session:', error);
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingSession(null);
    fetchSessions();
  };

  const openEditForm = (session: CurriculumSession) => {
    setEditingSession(session);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingSession(null);
    setIsFormOpen(true);
  };

  if (!localUser || !isAdmin) {
    return null; // Handled by useEffect redirect
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Loading sessions...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold ml-2">Manage Course Sessions</h1>
        </div>
        <div className="flex justify-end items-center mb-6">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddForm}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingSession ? 'Edit Session' : 'Add New Session'}</DialogTitle>
              </DialogHeader>
              <SessionForm session={editingSession} onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>

        {sessions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No sessions found. Click "Add New Session" to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <Card key={session.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>Session {session.session_number}: {session.title}</CardTitle>
                  <CardDescription>{session.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {session.covers_days && <p className="text-sm text-muted-foreground">Covers Days: {session.covers_days.join(', ')}</p>}
                  {session.topics && session.topics.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Topics:</p>
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        {session.topics.map((topic, i) => <li key={i}>{topic}</li>)}
                      </ul>
                    </div>
                  )}
                  {session.assignments && session.assignments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Assignments:</p>
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        {session.assignments.map((assignment, i) => <li key={i}>{assignment}</li>)}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <div className="p-4 border-t flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/admin/curriculum/sessions/${session.id}/lessons`}>
                      <ListChecks className="h-4 w-4" /> Lessons
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEditForm(session)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the session and all associated lessons.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteSession(session.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SessionManagement;