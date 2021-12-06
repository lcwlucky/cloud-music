import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store'
import Loading from '../../baseUI/loading';
import {
  List,
  ListItem,
  SongList,
  Container
} from './style';
import Scroll from '../../baseUI/scroll';
import { EnterLoading } from './../Singers/style';
import { filterIndex, filterIdx } from '../../api/utils';
import { renderRoutes } from 'react-router-config';

function Rank(props) {
  const { rankList: list, loading, songsCount } = props;
  const { getRankListDataDispatch } = props;
  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    if (!rankList.length) {
      getRankListDataDispatch();
    }
  }, []);

  /*排行榜单分为两个部分，一部分是官方榜，另一部分是全球榜。
    官方榜单数据有 tracks 数组，存放部分歌曲信息，而全球榜没有。
    但是后端数据并没有将这两者分开，因此我们需要做一下数据的处理。
  */
  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  // 实现跳转路由函数
  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`)
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item, i) => {
            return (
              <ListItem key={`${item.coverImgId}${i}`} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  let displayStyle = loading ? { "display": "none" } : { "display": "" };
  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>全球榜</h1>
          {renderRankList(globalList, true)}
          {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
  songsCount: state.getIn (['player', 'playList']).size,// 尽量减少 toJS 操作，直接取 size 属性就代表了 list 的长度
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));