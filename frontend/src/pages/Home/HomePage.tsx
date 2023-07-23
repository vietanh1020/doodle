import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Card } from "../../components/Home/Card";
import { NavBar } from "../../components/Navbar/NavBar";
import { userInfo } from "../../utils/atom";
import { httpClient } from "../../utils/httpClient";

export function HomePage() {
  const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

  const [polls, setPolls] = useState([] as any);

  const fetchData = async () => {
    const response = await httpClient.get("http://localhost:3001/poll");
    setPolls(response?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const user = useRecoilValue(userInfo);

  return (
    <div className="app">
      <NavBar />
      <h2 className="container mx-auto">
        Polls List of {user.firstName} {user.lastName}
      </h2>

      {polls && (
        <div className="container mt-3">
          <div className="row">
            {polls?.data?.map((poll: any, index: number) => {
              return (
                <div className="" key={index}>
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
