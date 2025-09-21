import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { db } from '@/integrations/firebase/client'; // Import Firebase db
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore'; // Firestore imports
import { CurriculumPhase, CurriculumModule } from '@/data/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError } from '@/utils/toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSession } from '@/components/SessionContextProvider'; // New import for session

const PhaseDetail: React.FC = () => {
  const { phaseId } = useParams<{ phaseId: string }>();
  const [phase, setPhase] = useState<CurriculumPhase | null>(null);
  const [modules, setModules] = useState<CurriculumModule[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSession(); // Get user from Firebase session

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login'); // Redirect if no user is logged in
      return;
    }

    const fetchPhaseAndModules = async () => {
      if (!phaseId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Fetch phase data
        const phaseDocRef = doc(db, 'phases', phaseId);
        const phaseDocSnap = await getDoc(phaseDocRef);

        if (!phaseDocSnap.exists()) {
          throw new Error('Phase not found');
        }
        setPhase({ id: phaseDocSnap.id, ...phaseDocSnap.data() } as CurriculumPhase);

        // Fetch modules for the phase
        const modulesCollectionRef = collection(db, 'modules');
        const modulesQuery = query(modulesCollectionRef, where('phase_id', '==', phaseId), orderBy('order_index'));
        const modulesSnapshot = await getDocs(modulesQuery);
        const modulesData = modulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CurriculumModule[];
        setModules(modulesData);

      } catch (error: any) {
        showError(`Failed to load phase details: ${error.message}`);
        console.error('Error fetching phase or modules:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && phaseId) { // Only fetch data if a user is logged in and phaseId is available
      fetchPhaseAndModules();
    }
  }, [phaseId, user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!phase) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Phase not found.</h2>
          <Link to="/" className="text-blue-500 hover:underline">Return to Curriculum</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold ml-2">{phase.title}</h1>
          </div>
        </div>
        <p className="text-lg text-muted-foreground mb-8">{phase.description}</p>

        <h2 className="text-2xl font-semibold mb-6">Modules ({phase.weeks} Weeks)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link to={`/phases/${phase.id}/modules/${module.id}`} key={module.id}>
              <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">{module.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PhaseDetail;