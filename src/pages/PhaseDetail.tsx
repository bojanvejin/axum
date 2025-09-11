import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { supabase } from '@/integrations/supabase/client';
import { CurriculumPhase, CurriculumModule } from '@/data/curriculum';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { showError } from '@/utils/toast';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Settings, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

const PhaseDetail: React.FC = () => {
  const { phaseId } = useParams<{ phaseId: string }>();
  const [phase, setPhase] = useState<CurriculumPhase | null>(null);
  const [modules, setModules] = useState<CurriculumModule[]>([]);
  const [loading, setLoading] = useState(true);
  const { role, loading: roleLoading } = useUserRole();
  const { t } = useLanguage(); // Use translation hook

  useEffect(() => {
    const fetchPhaseAndModules = async () => {
      setLoading(true);
      try {
        const { data: phaseData, error: phaseError } = await supabase
          .from('phases')
          .select('*')
          .eq('id', phaseId)
          .single();

        if (phaseError) throw phaseError;
        setPhase(phaseData);

        const { data: modulesData, error: modulesError } = await supabase
          .from('modules')
          .select('*')
          .eq('phase_id', phaseId)
          .order('order_index', { ascending: true });

        if (modulesError) throw modulesError;
        setModules(modulesData);
      } catch (error: any) {
        showError(t('failed_to_load_phases', { message: error.message }));
        console.error('Error fetching phase or modules:', error);
      } finally {
        setLoading(false);
      }
    };

    if (phaseId) {
      fetchPhaseAndModules();
    }
  }, [phaseId, t]);

  if (loading || roleLoading) {
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
          <h2 className="text-2xl font-bold">{t('phase_not_found')}</h2>
          <Link to="/" className="text-blue-500 hover:underline">{t('return_to_curriculum')}</Link>
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
          {role === 'admin' && (
            <Link to={`/admin/curriculum/phases/${phase.id}/modules`}>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" /> {t('manage_modules')}
              </Button>
            </Link>
          )}
        </div>
        <p className="text-lg text-muted-foreground mb-8">{phase.description}</p>

        <h2 className="text-2xl font-semibold mb-6">{t('modules_for_weeks', { weeks: phase.weeks })}</h2>
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