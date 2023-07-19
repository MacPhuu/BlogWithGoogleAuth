import BaseLayout from '@/layouts/BaseLayout'

import { ROUTER } from '@/configs/router'
import AuthLayout from '@/layouts/AuthLayout'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageLoader from '@/components/PageLoader'

const Article = React.lazy(() => import('./Article'))
const Editor = React.lazy(() => import('./Editor'))
const Home = React.lazy(() => import('./Home'))
const Login = React.lazy(() => import('./Login'))
const Profile = React.lazy(() => import('./Profile'))
const Register = React.lazy(() => import('./Register'))
const Settings = React.lazy(() => import('./Settings'))

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTER.HOME}
        element={
          <Suspense fallback={<PageLoader />}>
            <BaseLayout />
          </Suspense>
        }
      >
        <Route
          path={ROUTER.HOME}
          element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path={ROUTER.HOME}
          element={
            <Suspense fallback={<PageLoader />}>
              <AuthLayout />
            </Suspense>
          }
        >
          <Route path={ROUTER.LOGIN} element={<Login />} />
          <Route path={ROUTER.REGISTER} element={<Register />} />
        </Route>
        <Route path={ROUTER.SETTINGS} element={<Settings />} />
        <Route path={ROUTER.EDITOR} element={<Editor />} />
        <Route path={ROUTER.EDITOR_EDIT} element={<Editor />} />
        <Route path={ROUTER.ARTICLE} element={<Article />} />
        <Route path={ROUTER.PROFILE} element={<Profile />} />
        <Route path={ROUTER.PROFILE_FAVORITES} element={<Profile />} />
        <Route path="*" element={<Navigate to={ROUTER.HOME} />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
