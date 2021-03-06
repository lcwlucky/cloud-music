import React, { useState, useEffect, useContext } from 'react';
import Horizon from '../../baseUI/horizon-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import Scroll from '../../baseUI/scroll'
import {
  NavContainer,
  ListContainer,
  List,
  ListItem
} from "./style";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';
import { connect } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/loading';
import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from './data'
import { renderRoutes } from 'react-router-config';

function Singers(props) {
  const { data, dispatch } = useContext(CategoryDataContext);
  const { category, alpha } = data.toJS();
  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount, songsCount } = props;
  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;
  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch();
    }
  }, []);

  let handleUpdateAlpha = (val) => {
    dispatch({ type: CHANGE_ALPHA, data: val });
    updateDispatch(category, val);
  };

  let handleUpdateCatetory = (val) => {
    dispatch({ type: CHANGE_CATEGORY, data: val });
    updateDispatch(val, alpha);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`);
  };

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    return (
      <List>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.accountId + "" + index} onClick={() => enterDetail(item.id)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  return (
    <div>
      <NavContainer>
        <Horizon
          list={categoryTypes}
          title={"??????(????????????):"}
          handleClick={(val) => handleUpdateCatetory(val)}
          oldVal={category} />
        <Horizon
          list={alphaTypes}
          title={"?????????:"}
          handleClick={val => handleUpdateAlpha(val)}
          oldVal={alpha} />
      </NavContainer>
      <ListContainer play={songsCount}>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading}></Loading>
        {renderRoutes(props.route.routes)}
      </ListContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
  songsCount: state.getIn(['player', 'playList']).size,// ???????????? toJS ?????????????????? size ?????????????????? list ?????????
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));//??????????????????????????????pageCount??????
      dispatch(changeEnterLoading(true));//loading???
      dispatch(getSingerList(category, alpha));
    },
    // ????????????????????????????????????
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //??????????????????
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//????????????????????????
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));