"use client";

import { SnackbarProvider } from "notistack";

const NotiStackProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default NotiStackProvider;