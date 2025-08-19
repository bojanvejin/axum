import React from 'react';
import { CurriculumPhase } from '@/data/curriculum';
import BentoGridItem from './BentoGridItem'; // Corrected import path

interface CurriculumCardProps {
  phase: CurriculumPhase;
}

const CurriculumCard: React.FC<CurriculumCardProps> = ({ phase }) => {
  return (
    <BentoGridItem
      title={phase.title}
      description={`Duration: ${phase.weeks} Weeks`}
      className="md:col-span-2" // Make phase cards span 2 columns for more space
    >
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-md">Modules:</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          {phase.modules.map((module, index) => (
            <li key={index} className="mb-1">
              <span className="font-medium text-foreground">{module.title}:</span> {module.description}
            </li>
          ))}
        </ul>
      </div>
    </BentoGridItem>
  );
};

export default CurriculumCard;