import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, StopCircle } from 'lucide-react';
import { showError } from '@/utils/toast';
import { useLanguage } from '@/contexts/LanguageContext'; // Import useLanguage

interface TextToSpeechButtonProps {
  textToSpeak: string;
}

const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({ textToSpeak }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t } = useLanguage(); // Use translation hook
  
  const synth = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.speechSynthesis;
    }
    return null;
  }, []);

  const handleToggleSpeech = () => {
    if (!synth) {
      showError(t('browser_no_tts'));
      return;
    }

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      if (synth.speaking) {
        synth.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        showError(t('tts_error'));
        setIsSpeaking(false);
      };
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    return () => {
      if (synth && synth.speaking) {
        synth.cancel();
      }
    };
  }, [synth]);

  return (
    <Button onClick={handleToggleSpeech} variant="outline" size="sm">
      {isSpeaking ? (
        <>
          <StopCircle className="mr-2 h-4 w-4" />
          {t('stop_reading')}
        </>
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" />
          {t('read_aloud')}
        </>
      )}
    </Button>
  );
};

export default TextToSpeechButton;