import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";

export const action = createSafeActionClient();

export class ActionError extends Error {}

export const authenticatedAction = action.use(async ({ next, ctx }) => {
  const session = await auth()

  if (!session) {
    throw new Error("Session not found!");
  }

  const userId = session.user?.id

  if (!userId) {
    throw new Error("Session is not valid!");
  }

  return next({ ctx: { userId } });
});