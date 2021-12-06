import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import Home from '../views/Home';

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const Recommend = lazy(() => import("../views/Recommend/"));
const Singers = lazy(() => import("../views/Singers/"));
const Rank = lazy(() => import("../views/Rank/"));
const Album = lazy(() => import("../views/Album/"));
const Singer = lazy(() => import("./../views/Singer/"));
const Search = lazy(() => import("./../views/Search/"));

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"} />
        )
      },
      {
        path: "/recommend",
        component: SuspenseComponent(Recommend),
        routes: [
          {
            path: "/recommend/:id",
            component: SuspenseComponent(Album)
          }
        ]
      },
      {
        path: "/singers",
        component: SuspenseComponent(Singers),
        routes: [
          {
            path: "/singers/:id",
            component: SuspenseComponent(Singer)
          }
        ]
      },
      {
        path: "/rank",
        component: SuspenseComponent(Rank),
        routes: [
          {
            path: "/rank/:id",
            component: SuspenseComponent(Album)
          }
        ]
      },
      {
        path: "/search",
        exact: true,
        key: "search",
        component: SuspenseComponent(Search)
      }
    ]
  }
]