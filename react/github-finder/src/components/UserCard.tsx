import { FaGithubAlt } from "react-icons/fa";

type Props = {
  user: GithubUser;
};
export const UserCard = ({ user }: Props) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.name} className="avatar" />
      <h2>{user.name || user.login}</h2>
      <p className="bio">{user.bio}</p>
      <a
        href={user.html_url}
        className="profile-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithubAlt /> View GitHub Profile
      </a>
    </div>
  );
};
