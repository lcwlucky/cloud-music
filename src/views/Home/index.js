import React, { useRef } from 'react';
import { renderRoutes } from "react-router-config";
import { Top, Tab, TabItem } from './style';
import { NavLink } from 'react-router-dom'
import Player from '../Player'
import Confirm from './../../baseUI/confirm';

function Home(props) {
  const { route } = props;
  const confirmRef = useRef();
  return (
    <div>
      <Top>
        <span className="iconfont menu" onClick={() => confirmRef.current.show()}>&#xe65c;</span>
        <span className="title">随心听</span>
        <span className="iconfont search" onClick={() => props.history.push('/search')}>&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected">
          <TabItem><span > 推荐 </span></TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem><span > 歌手 </span></TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem><span > 排行榜 </span></TabItem>
        </NavLink>
      </Tab>
      {renderRoutes(route.routes)}
      <Player></Player>
      <Confirm ref={confirmRef} text={"用户中心正在开发中，敬请期待!"} cancelBtnText={"取消"} confirmBtnText={"确定"} ></Confirm>
    </div>
  )
}

export default React.memo(Home);