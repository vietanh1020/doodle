import { useEffect, useState } from "react";
import { Card } from "../../components/Home/Card";
import { NavBar } from "../../components/Navbar/NavBar";
import { usePrivateRoute } from "../../hooks/auth/usePrivateRoute";
import { httpClient } from "../../utils/httpClient";

export function HomePage() {
  const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

  usePrivateRoute();
  const [countDelete, setCountDelete] = useState("");
  const [polls, setPolls] = useState([] as any);

  useEffect(() => {
    httpClient.get("/poll").then((response) => {
      setPolls(response.data);
    });
  }, [countDelete]);

  const callbackFunction = (childData: string) => {
    setCountDelete(childData);
  };

  return (
    <div className="app">
      <NavBar />
      {polls && (
        <div className="container mt-3">
          <div className="row">
            {polls?.data?.map((poll: any, index: number) => {
              return (
                <div className="col-12 col-lg-3" key={index}>
                  <Card
                    key={index}
                    question={poll.question}
                    image={`${REACT_APP_API_URL}/images/${poll.image}`}
                    id={poll.id}
                    startAt={poll.startAt}
                    endAt={poll.endAt}
                    description={poll.description}
                    parentCallback={callbackFunction}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
