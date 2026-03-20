import { AlertDialog } from '../components/dialogs/AlertDialog';
import React from 'react';
import ErrorDialogUI from '../components/dialogs/dialog-UIs/ErrorDialogUI';
import SuccessDialogUI from '../components/dialogs/dialog-UIs/SuccessDialogUI';
import WarningDialogUI from '../components/dialogs/dialog-UIs/WarningDialogUI';

type AlertParams = {
  message: string;
  title?: string;
  onClose?: () => void;
};

export namespace AlertUtils {
  export const showErrorAlert = ({ message, title, onClose }: AlertParams) => {
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

  export const showSuccessAlert = ({
    message,
    title,
    onClose,
  }: AlertParams) => {
    AlertDialog.show({
      backgroundTapClose: true,
      children: React.createElement(SuccessDialogUI, {
        message,
        title,
        onClose: () => {
          AlertDialog.hide();
          onClose?.();
        },
      }),
    });
  };

  export const showWarningAlert = ({
    message,
    title,
    onClose,
  }: AlertParams) => {
    AlertDialog.show({
      backgroundTapClose: true,
      children: React.createElement(WarningDialogUI, {
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
