import Header from "../header/Header";
import TownTable from "../townTable/TownTable";
import "./ShowPage.css";

function ShowPage() {
  return (
    <>
      <div className="box">
      <Header className="headerTable"></Header>
        <TownTable className="showPage" />
      </div>
    </>
  );
}

export default ShowPage;
