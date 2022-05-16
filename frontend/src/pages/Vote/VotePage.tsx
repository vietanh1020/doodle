import { CreateVote } from "../../components/Vote/CreateVote";
import { ResultVote } from "../../components/Vote/ResultVote";
import { useGetSlug } from "../../hooks/help/useGetSlug";
import classes from "./comment.module.css";

export function VotePage() {
  const id = useGetSlug();

  return (
    <div className="container">
      <CreateVote id={id}/>
    </div>
  );
}
