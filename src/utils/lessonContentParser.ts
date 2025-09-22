import DOMPurify from 'dompurify';

interface ParsedLessonResources {
  videoSuggestion: string | null;
  readingSuggestion: string | null;
}

/**
 * Parses the lesson's HTML content to extract video and reading suggestions
 * from the "At-Home Learning" section.
 * @param htmlContent The sanitized HTML content of the lesson.
 * @returns An object containing video and reading suggestions.
 */
export const parseLessonResources = (htmlContent: string): ParsedLessonResources => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  let videoSuggestion: string | null = null;
  let readingSuggestion: string | null = null;

  const atHomeLearningSection = doc.querySelector('h2#at-home-learning');
  if (atHomeLearningSection) {
    let currentNode: Element | null = atHomeLearningSection.nextElementSibling;

    while (currentNode && currentNode.tagName !== 'H2') { // Stop at the next H2 or end of section
      if (currentNode.tagName === 'H3') {
        const headingText = currentNode.textContent?.trim();
        if (headingText === 'Reading') {
          let contentNode: Element | null = currentNode.nextElementSibling;
          if (contentNode && (contentNode.tagName === 'UL' || contentNode.tagName === 'P')) {
            readingSuggestion = contentNode.textContent?.trim() || null;
          }
        } else if (headingText === 'Video') {
          let contentNode: Element | null = currentNode.nextElementSibling;
          if (contentNode && (contentNode.tagName === 'UL' || contentNode.tagName === 'P')) {
            videoSuggestion = contentNode.textContent?.trim() || null;
          }
        }
      }
      currentNode = currentNode.nextElementSibling;
    }
  }

  // Fallback: if specific sections not found, try to extract from general content
  if (!readingSuggestion) {
    const readingHeading = doc.querySelector('h3:contains("Reading")');
    if (readingHeading) {
      let contentNode = readingHeading.nextElementSibling;
      if (contentNode && (contentNode.tagName === 'UL' || contentNode.tagName === 'P')) {
        readingSuggestion = contentNode.textContent?.trim() || null;
      }
    }
  }

  if (!videoSuggestion) {
    const videoHeading = doc.querySelector('h3:contains("Video")');
    if (videoHeading) {
      let contentNode = videoHeading.nextElementSibling;
      if (contentNode && (contentNode.tagName === 'UL' || contentNode.tagName === 'P')) {
        videoSuggestion = contentNode.textContent?.trim() || null;
      }
    }
  }

  // Clean up suggestions to be more search-friendly
  if (videoSuggestion) {
    videoSuggestion = videoSuggestion.replace(/Short clip:|Tutorial:|Educational animation:|Video:/g, '').trim();
    if (videoSuggestion.startsWith('“') && videoSuggestion.endsWith('”')) {
      videoSuggestion = videoSuggestion.substring(1, videoSuggestion.length - 1);
    }
  }
  if (readingSuggestion) {
    readingSuggestion = readingSuggestion.replace(/Reading:|Article:|Chapter on:/g, '').trim();
    if (readingSuggestion.startsWith('“') && readingSuggestion.endsWith('”')) {
      readingSuggestion = readingSuggestion.substring(1, readingSuggestion.length - 1);
    }
  }

  return { videoSuggestion, readingSuggestion };
};