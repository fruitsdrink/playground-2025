import { useQueryClient } from "@tanstack/react-query";
import { FaClock, FaUser } from "react-icons/fa";
import { fetchGithubUser } from "../api/github";

type Props = {
  users: string[];
  onSelect: (username: string) => void;
};
export const RecentSearches = ({ users, onSelect }: Props) => {
  const queryClient = useQueryClient();

  return (
    <div className="recent-searches">
      <div className="recent-header">
        <FaClock />
        <h3>Recent Searches</h3>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button
              onClick={() => {
                onSelect(user);
              }}
              onMouseEnter={() => {
                queryClient.prefetchQuery({
                  queryKey: ["user", user],
                  queryFn: () => fetchGithubUser(user),
                });
              }}
            >
              <FaUser className="user-icon" />
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
