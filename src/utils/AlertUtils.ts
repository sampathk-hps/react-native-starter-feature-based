import { AlertDialog } from '../components/dialogs/AlertDialog';
import React from 'react';
import ErrorDialogUI from '../components/dialogs/dialog-UIs/ErrorDialogUI';

export namespace AlertUtils {
  export const showErrorAlert = ({
    message,
    title,
    onClose,
  }: {
    message: string;
    title?: string;
    onClose?: () => void;
  }) => {
    AlertDialog.show({
      backgroundTapClose: true,
      children: React.createElement(ErrorDialogUI, {
        message,
        title,
        onClose: () => {
          AlertDialog.hide();
          onClose?.();
        },
      }),
    });
  };
}
