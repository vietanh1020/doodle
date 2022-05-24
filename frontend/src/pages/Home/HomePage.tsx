import { useEffect, useState } from "react";
import { Card } from "../../components/Home/Card";
import { NavBar } from "../../components/Navbar/NavBar";
import { httpClient } from "../../utils/httpClient";
import { userAtom } from "../Login/LoginPage";
import { Provider, atom, useAtom } from "jotai";

export function HomePage() {
  const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

  const [polls, setPolls] = useState([] as any);

  const fetchData = async () => {
    const response = await httpClient.get("http://localhost:3001/poll");

    setPolls(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [user] = useAtom(userAtom);

  return (
    <div className="app">
      <NavBar />
      {polls && (
        <div className="container mt-3">
          <div className="row">
            {polls?.data?.map((poll: any, index: number) => {
              return (
                <div
                  className="col-12	col-sm-6	col-md-4	col-lg-4	col-xl-3"
                  key={index}
                >
                  <Card
                    key={index}
                    question={poll.question}
                    image={`${REACT_APP_API_URL}/images/${poll.image}`}
                    id={poll.id}
                    startAt={poll.startAt}
                    endAt={poll.endAt}
                    description={poll.description}
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
