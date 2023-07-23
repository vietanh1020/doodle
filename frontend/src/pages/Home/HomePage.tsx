import { Button, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Card } from "../../components/Home/Card";
import { NavBar } from "../../components/Navbar/NavBar";
import { userInfo } from "../../utils/atom";
import { httpClient } from "../../utils/httpClient";

export function HomePage() {
  const navigate = useNavigate();

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
      <Grid className="container mx-auto">
        <h2>
          Polls List of {user.firstName} {user.lastName}
        </h2>
        <Button
          onClick={() => navigate("/poll")}
          variant="contained"
          style={{ marginTop: "20px" }}
        >
          Add New Poll
        </Button>
      </Grid>

      {polls && (
        <div className="container mt-3">
          <div className="row">
            {polls?.data?.map((poll: any, index: number) => {
              return (
                <div className="col col-4" key={index}>
                  <Card key={index} {...poll} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
