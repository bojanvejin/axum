import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, StopCircle } from 'lucide-react';
import { showError } from '@/utils/toast';

interface TextToSpeechButtonProps {
  textToSpeak: string;
}

const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({ textToSpeak }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Memoize synth to avoid re-checking on every render
  const synth = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.speechSynthesis;
    }
    return null;
  }, []);

  const handleToggleSpeech = () => {
    if (!synth) {
      showError("Your browser does not support text-to-speech.");
      return;
    }

    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      if (synth.speaking) {
        synth.cancel(); // Cancel any previous speech before starting a new one
      }
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        showError("An error occurred during text-to-speech.");
        setIsSpeaking(false);
      };
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Cleanup on component unmount
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
          Stop Reading
        </>
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" />
          Read Aloud
        </>
      )}
    </Button>
  );
};

export default TextToSpeechButton;