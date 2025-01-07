import { Trash2 } from "lucide-react";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  title: string;
  description: string;
  onDelete: () => void;
  onCancel?: () => void;
  triggerClassName?: string;
  cancelText?: string;
  deleteText?: string;
  buttonText?: string;
  loading?: boolean;
}

export const ConfirmDialog = ({
  title,
  description,
  onDelete,
  onCancel,
  triggerClassName = "",
  cancelText = "Cancel",
  deleteText = "Delete",
  loading = false,
  buttonText,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {buttonText ? (
          <span
            className={cn(
              "cursor-pointer",
              buttonText === "Change" ? "text-green-400" : "text-red-400"
            )}
          >
            {buttonText}
          </span>
        ) : (
          <Button
            variant="destructive"
            size="sm"
            className={`size-8 p-0 ${triggerClassName}`}
            disabled={loading}
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={onCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={loading}
          >
            {loading ? "Deleting..." : deleteText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
