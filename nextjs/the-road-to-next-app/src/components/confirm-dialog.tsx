import {
  cloneElement,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
// import { Form } from "./form/components/form";
// import { SubmitButton } from "./form/components/submit-button";
import { useActionFeedback } from "./form/hooks/use-action-feedback";
import { ActionState, EMPTY_ACTION_STATE } from "./form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type UseConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick: () => void }>;
  onSuccess?: (actionState: ActionState) => void;
};
export function useConfirmDialog({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Please confirm that you want to proceed.",
  action,
  trigger,
  onSuccess,
}: UseConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });

  const [actionState, formAction, isPending] = useActionState(
    action,
    EMPTY_ACTION_STATE
  );

  // const handleSuccess = () => {
  //   setIsOpen(false);
  //   onSuccess?.(actionState);
  // };

  const toastRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading("Deleting ...");
    } else if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }

    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
        toastRef.current = null;
      }
    };
  }, [isPending]);

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            {/* <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <SubmitButton label="Confirm" />
            </Form> */}

            <form action={formAction}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
}
