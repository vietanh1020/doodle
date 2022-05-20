import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../utils/httpClient";

export function ResultVote(props: any) {
  const navigate = useNavigate();
  const color = ["00c1cd", "5581DC", "E25697", "e6dd39", "#e68739", "#d539e6"];
  const [resultVote, setResultVote] = useState([] as any[]);
  const [totalVote, setTotalVote] = useState(0);
  useEffect(() => {
    httpClient
      .get(`/result/${props.id}`)
      .then((response) => {
        const resultObj = response.data.data;
        let resultArr = [];
        let total = 0;
        for (let key in resultObj) {
          total = total + resultObj[key];
          resultArr.push({ [key]: resultObj[key] });
        }
        setResultVote(resultArr);
        setTotalVote(total);
      })
      .catch((err) => {
        navigate("/404-not-found");
      });
  }, []);

  return (
    <div className="">
      <h6 className="text-center">Kết quả bình chọn</h6>

      {resultVote &&
        resultVote.map((result: {}, index: number) => {
          return (
            <div className="result_vote" key={index}>
              <div className="result-item form-group m-3">
                <div className="answer-option">{Object.keys(result)}</div>
                <div className="row">
                  <div
                    className="col-9"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      className="result-percent"
                      style={{
                        width: `${Math.floor(
                          (Number(Object.values(result)) / totalVote) * 1002
                        )}px`,
                        height: "10px",
                        backgroundColor: `#${color[index]}`,
                        borderRadius: "4px",
                      }}
                    ></div>
                  </div>
                  <div className="col-3" style={{ padding: "0 5px" }}>
                    {(
                      (Number(Object.values(result)) / totalVote) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </div>
                </div>

                <div className="total-voted">{Object.values(result)} Votes</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
