import { useMutation, useQuery } from "@tanstack/react-query";
import { FaGithubAlt, FaUserMinus, FaUserPlus } from "react-icons/fa";
import {
  checkIfFollowingUser,
  followGithubUser,
  unfollowGithubUser,
} from "../api/github";
import { toast } from "sonner";

type Props = {
  user: GithubUser;
};
export const UserCard = ({ user }: Props) => {
  const {
    data: isFollowing,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["follow-status", user.login],
    queryFn: () => checkIfFollowingUser(user.login),
    enabled: !!user.login,
  });

  const followMutation = useMutation({
    mutationFn: () => followGithubUser(user.login),
    onSuccess: () => {
      toast.success(`You are now following ${user.login}`);
      refetch();
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(`Failed to following ${user.login}`);
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowGithubUser(user.login),
    onSuccess: () => {
      toast.success(`You are now unfollow ${user.login}`);
      refetch();
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(`Failed to unfollow ${user.login}`);
    },
  });

  const handleFollow = () => {
    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.name} className="avatar" />
      <h2>{user.name || user.login}</h2>
      <p className="bio">{user.bio}</p>
      <div className="user-card-buttons">
        {!isLoading && (
          <button
            disabled={followMutation.isPending || unfollowMutation.isPending}
            onClick={handleFollow}
            className={`follow-btn ${isFollowing ? "following" : ""}`}
          >
            {isFollowing ? (
              <>
                <FaUserMinus className="follow-icon" /> Following
              </>
            ) : (
              <>
                <FaUserPlus className="follow-icon" /> Follow User
              </>
            )}
          </button>
        )}
        <a
          href={user.html_url}
          className="profile-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithubAlt /> View GitHub Profile
        </a>
      </div>
    </div>
  );
};
