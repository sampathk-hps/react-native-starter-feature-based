export namespace StringUtils {
  export const capitalizeFirstLetters = (text: string): string => {
    return text.replace(/(^\w|\s\w)/g, match => match.toUpperCase());
  };

  export const capitalizeFirstLetter = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  export const includesAnySubstring = (
    str: string,
    substrings: string[],
  ): boolean => {
    return substrings.some(substring => str.includes(substring));
  };

  export const formatArrayWithAnd = (items: string[]): string => {
    if (items.length === 0) {
      return '';
    }
    if (items.length === 1) {
      return items[0];
    }

    const lastItem = items[items.length - 1];
    const restItems = items.slice(0, -1);

    return `${restItems.join(', ')} and ${lastItem}`;
  };

  export const htmlToText = (html: string): string => {
    if (!html) {
      return '';
    }

    return html
      .replace(/<[^>]*>/g, '') // This removes the complete tags including content between < and >
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/&amp;/g, '&') // Replace &
      .replace(/&lt;/g, '<') // Replace <
      .replace(/&gt;/g, '>') // Replace >
      .replace(/&quot;/g, '"') // Replace "
      .replace(/&#39;/g, "'") // Replace '
      .trim(); // Remove extra whitespace
  };

  export const extractTextInParentheses = (text: string): string => {
    const match = text.match(/\(([^)]+)\)/);
    return match ? match[1] : text;
  };

  export const isEmptyHTMLString = (htmlString: string): boolean => {
    const textContent = htmlToText(htmlString);
    return !textContent || textContent.trim().length === 0;
  };
}
