import { useEffect } from 'react';
import TownStore from '../../stores/TownStore';
import Header from '../header/Header'
import TownTable from '../townTable/TownTable'
import './ShowPage.css'

function ShowPage() {
  useEffect(() => {
    TownStore.getTown();
    console.log("use effect", TownStore.townList);
  }, [TownStore.getTown()]);
  return (
    <>
    <div className='box'>
       <Header className="headerTable" ></Header>
        <TownTable className="showPage"/>
    </div>
    </>
  )
}

export default ShowPage
