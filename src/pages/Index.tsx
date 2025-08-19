import Layout from "@/components/Layout";
import BentoGrid from "@/components/BentoGrid";
import CurriculumCard from "@/components/CurriculumCard";
import { curriculumData } from "@/data/curriculum";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          AXUM Internal Training Curriculum
        </h1>
        <p className="text-lg md:text-xl text-center text-muted-foreground max-w-3xl mb-12">
          This platform provides a detailed guide for building the Axum Education Platform, ensuring clarity, consistency, and easy integration into online training modules.
        </p>
        <BentoGrid className="w-full max-w-6xl mx-auto">
          {curriculumData.map((phase) => (
            <CurriculumCard key={phase.id} phase={phase} />
          ))}
        </BentoGrid>
      </div>
    </Layout>
  );
};

export default Index;