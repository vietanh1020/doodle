import { useNavigate } from "react-router-dom";
import LogOut from "../LogOut/LogOut";

export function NavBar() {
  const navigate = useNavigate()
  const handleAddPoll= () =>{
    navigate('/poll')
  }

  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOEMzSVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--96f5b80c484203b62424d15864e1bc6c84af129f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--623b1a923c4c6ecbacda77c459f93960558db010/LogoCompany.png"
              height="30"
              width="30"
              z-index="1"
              alt="Zinza Logo"
              loading="lazy"
            />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Projects
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
         <button className="btn btn-primary" onClick={handleAddPoll}>Tạo cuộc bình chọn</button>
        </div>
        

        <div className="d-flex align-items-center">
          Viêt Anh Võ   
        </div>
        

        <p className="user_name mr-3" style={{color: 'white'}}>Việt Anh Võ</p>
        <div className="d-flex align-items-center">
          <img
            src={`https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/72415716_744118709367885_7095120900218945536_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=8r5ygk-vXXIAX_aulDI&_nc_ht=scontent.fhan2-1.fna&oh=00_AT9l6iYyS608gflPCcnPaL_w-N0w1syWXQ66byAMDBrvHQ&oe=628F9033""https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/72415716_744118709367885_7095120900218945536_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=8r5ygk-vXXIAX_aulDI&_nc_ht=scontent.fhan2-1.fna&oh=00_AT9l6iYyS608gflPCcnPaL_w-N0w1syWXQ66byAMDBrvHQ&oe=628F9033`}
            className="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
        </div>

        <LogOut/>
      </div>
    </nav>
  );
}
