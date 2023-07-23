import styled from "styled-components";

function TabList() {
  // const;
  return (
    <>
      <List>
        <div className="tabItem  active">Vote</div>

        {/* <div className={`tabItem  active`}>Vote</div> */}
      </List>
    </>
  );
}

type TabListDto = {
  page: string;
};

const List = styled.div`
  height: 37px;
  margin-bottom: 49px;
  border-bottom: 1px solid;
  line-height: 21px;
  border-color: transparent transparent $payment-line transparent;
  display: flex;

  .tabItem {
    font-size: 18px;
    cursor: pointer;
    margin-right: 84px;
  }

  .active {
    color: #41b49b !important;
    font-weight: 500;
    position: relative;
  }

  .active::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -1px;
    background-color: #41b49b;
  }
`;

export default TabList;
