"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthRedirect } from "@/features/auth/queries/get-auth-redirect";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});
export async function createComment(
  ticketId: string,
  _actionState: ActionState,
  formData: FormData
) {
  const { user } = await getAuthRedirect();

  let comment = null;
  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));
    comment = await prisma.comment.create({
      data: {
        userId: user.id,
        ticketId,
        ...data,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Comment created", undefined, {
    ...comment,
    isOwner: true,
  });
}
