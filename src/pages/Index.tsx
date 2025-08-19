import React, { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import BentoGrid from "@/components/BentoGrid";
import CurriculumCard from "@/components/CurriculumCard";
import { CurriculumPhase } from "@/data/curriculum";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { showError } from '@/utils/toast';
import { Link } from 'react-router-dom';

const Index = () => {
  const [phases, setPhases] = useState<CurriculumPhase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhases = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('phases')
          .select('*')
          .order('order_index', { ascending: true });

        if (error) throw error;
        setPhases(data || []);
      } catch (error: any) {
        showError(`Failed to load curriculum phases: ${error.message}`);
        console.error('Error fetching phases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhases();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          AXUM Internal Training Curriculum
        </h1>
        <p className="text-lg md:text-xl text-center text-muted-foreground max-w-3xl mb-12">
          This platform provides a detailed guide for building the Axum Education Platform, ensuring clarity, consistency, and easy integration into online training modules.
        </p>
        {loading ? (
          <BentoGrid className="w-full max-w-6xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 md:col-span-2" />
            ))}
          </BentoGrid>
        ) : (
          <BentoGrid className="w-full max-w-6xl mx-auto">
            {phases.map((phase) => (
              <Link to={`/phases/${phase.id}`} key={phase.id} className="block">
                <CurriculumCard phase={phase} />
              </Link>
            ))}
          </BentoGrid>
        )}
      </div>
    </Layout>
  );
};

export default Index;