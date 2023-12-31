import { CreateVote } from "../../components/Vote/CreateVote";
import { useGetSlug } from "../../hooks/help/useGetSlug";

export function VotePage() {
  const id = useGetSlug();

  return (
    <div className="container">
      <CreateVote id={id} />
    </div>
  );
}
