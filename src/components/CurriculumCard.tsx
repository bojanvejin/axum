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
      {/* The module list was removed because the data is not available here. */}
    </BentoGridItem>
  );
};

export default CurriculumCard;