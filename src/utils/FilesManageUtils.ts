import FileExtensionType from '../models/enums/FileExtensionType';

const MIME_TYPE_MAP: Record<string, string> = {
  [FileExtensionType.DOC]: 'application/msword',
  [FileExtensionType.DOCX]:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  [FileExtensionType.PDF]: 'application/pdf',
  [FileExtensionType.JSON]: 'application/json',
  [FileExtensionType.YAML]: 'application/x-yaml',
  [FileExtensionType.YML]: 'application/x-yaml',
  [FileExtensionType.PNG]: 'image/png',
  [FileExtensionType.JPG]: 'image/jpeg',
  [FileExtensionType.JPEG]: 'image/jpeg',
  [FileExtensionType.SVG]: 'image/svg+xml',
  [FileExtensionType.MP4]: 'video/mp4',
};

export namespace FileManageUtils {
  export const isValidFileExtension = (extension: string): boolean => {
    const normalized = extension.toLowerCase().replace('.', '');
    return Object.values(FileExtensionType).includes(
      normalized as FileExtensionType,
    );
  };

  export const getMimeType = (extension: string): string | null => {
    const normalized = extension.toLowerCase().replace('.', '');
    return MIME_TYPE_MAP[normalized] ?? null;
  };
}
