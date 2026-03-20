import FileExtensionType from '../models/enums/FileExtensionType';
import ImagePickerErrorTypes from '../models/enums/ImagePickerErrorTypes';
import { i18n } from '../core/localization/i18n';

const IMAGE_EXTENSIONS: ReadonlySet<string> = new Set([
  FileExtensionType.PNG,
  FileExtensionType.JPG,
  FileExtensionType.JPEG,
  FileExtensionType.SVG,
]);

export namespace ImageUtil {
  export const isValidImageExtension = (extension: string): boolean =>
    IMAGE_EXTENSIONS.has(
      extension.toLowerCase().replace('.', '') as FileExtensionType,
    );

  export const getImageErrorMessage = (
    error: ImagePickerErrorTypes,
  ): string => {
    switch (error) {
      case ImagePickerErrorTypes.CAMERA_UNAVAILABLE:
        return i18n.t('errors.cameraUnavailable');
      case ImagePickerErrorTypes.PERMISSIONS:
        return i18n.t('errors.permissionDenied');
      case ImagePickerErrorTypes.USER_CANCELLED:
        return i18n.t('errors.selectionCancelled');
      case ImagePickerErrorTypes.EXTENSION_INVALID:
        return i18n.t('errors.unsupportedFileType');
      case ImagePickerErrorTypes.SIZE_INVALID:
        return i18n.t('errors.imageSizeExceeded');
      default:
        return i18n.t('errors.unexpectedError');
    }
  };
}
