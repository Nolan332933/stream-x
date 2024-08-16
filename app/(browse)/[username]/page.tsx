import { StreamPlayer } from "@/components/stream-player";
import { isBlockedByUser } from "@/lib/block-service";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

interface UsernameProps {
  params: {
    username: string;
  };
}
const UserPage = async ({ params }: UsernameProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);
  return (
    <div>
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
      />
    </div>
  );
};

export default UserPage;
