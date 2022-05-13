import { useEffect, useState } from "react";
import { NavBar } from "../../components/Navbar/NavBar";
import { useGetSlug } from "../../hooks/help/useGetSlug";
import { httpClient } from "../../utils/httpClient";
import classes from "./pollDetail.module.css";

export function PollDetail() {
  const [poll, setPoll] = useState({}  as any);
  const id = useGetSlug();
  const { API_URL = "http://localhost:3001" } = process.env;

  useEffect(() => {
    httpClient.get(`/poll/${id}`).then((response) => {
      setPoll(response.data.data);
    });
  }, []);

  console.log(poll);
  

  return (
    <div className="page">
      <NavBar />
      {poll && (
        <div className="container mt-3">
          <div className="col-md-12">
            <section className={classes.panel}>
              <div className={`row ${classes.panel_body}`}>
                <div className="col-md-6">
                  <div className={classes.pro_img_details}>
                    <img src={`${API_URL}/images/${poll.image}`} alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <h2 className=''>{poll.question}</h2>
                  <p>
                    {poll.description}
                  </p>
                  <div className={classes.product_meta}>
                    <span className="posted_in">
                      <strong>Bắt đầu:</strong>
                      <p>{}</p>
                    </span>
                    <span className={classes.tagged_as}>
                      <strong>Tags:</strong>
                      <a rel="tag" href="#">
                        mens
                      </a>
                      ,
                      <a rel="tag" href="#">
                        womens
                      </a>
                      .
                    </span>
                  </div>
                  <div className="m-bot15">
                    <strong>Price : </strong>
                    <span className="amount_old">$544</span>
                    <span className="pro-price"> $300.00</span>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="quantiy"
                      placeholder="1"
                      className="form-control quantity"
                    />
                  </div>
                  <p>
                    <button className="btn btn-round btn-danger" type="button">
                      <i className="fa fa-shopping-cart"></i> Add to Cart
                    </button>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
