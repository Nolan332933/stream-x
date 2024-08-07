// FollowButton.tsx
"use client";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs"; // Import Clerk's useAuth hook
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface ActionProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionProps) => {
  const { isSignedIn } = useAuth(); // Get the authentication state
  const router = useRouter(); // Initialize router for navigation
  const [isPending, startTransition] = useTransition();

  const handleAction = (action: "follow" | "unfollow") => {
    if (!isSignedIn) {
      // If the user is not signed in, redirect to the login page
      router.push("/sign-in");
      return;
    }

    const actionFunction = action === "follow" ? onFollow : onUnfollow;
    const successMessage = action === "follow" ? "Followed" : "Unfollowed";
    const errorMessage = action === "follow" ? "Follow" : "Unfollow";

    startTransition(() => {
      actionFunction(userId)
        .then((data) => {
          if (data?.following?.username) {
            toast.success(`${successMessage} ${data.following.username}`);
          } else {
            toast.error("Unexpected response from server");
          }
        })
        .catch((error) => {
          console.error(`${errorMessage} error:`, error);
          toast.error("Something went wrong. Please try again later.");
        });
    });
  };

  const onClick = () => {
    handleAction(isFollowing ? "unfollow" : "follow");
  };

  return (
    <Button disabled={isPending} onClick={onClick} variant="primary">
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
