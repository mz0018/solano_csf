import { StrictMode, Suspense, lazy } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config.ts'
import App from './App.tsx'

import ProtectedRoutes from './utils/ProtectedRoutes.tsx'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Loader } from './components/Loader'
import { Toaster } from 'sonner'

const Signin = lazy(() => import('./pages/Signin.tsx'))
const CreateFeedback = lazy(() => import('./pages/CreateFeedback.tsx'))

const HowItWorksPage1 = lazy(() => import('./components/Articles/pages/HowItWorks_Page01.tsx'))
const HowItWorksPage2 = lazy(() => import('./components/Articles/pages/HowItWorks_Page02.tsx'))
const HowItWorksPage3 = lazy(() => import('./components/Articles/pages/HowItWorks_Page03.tsx'))

import { RootLayout } from './layout/RootLayout'

const AdminLayout = lazy(() => import('./layout/AdminLayout.tsx'))
const PublicLayout = lazy(() => import('./layout/PublicLayout.tsx'))
const ActiveQueueTicket = lazy(() => import('./pages/admin/ActiveQueueTicket.tsx'))
const ReportsStatistics = lazy(() => import('./pages/admin/ReportStatistics.tsx'))
const OfficesFeedbacks = lazy(() => import('./pages/admin/OfficesFeedbacks.tsx'))

const Settings = lazy(() => import('./pages/admin/Settings.tsx'))
const ProfileSettings = lazy(() => import('./pages/admin/settings/ProfileSettings.tsx'))
const SecuritySettings = lazy(() => import('./pages/admin/settings/SecuritySettings.tsx'))
const NotificationSettings = lazy(() => import('./pages/admin/settings/NotificationSettings.tsx'))

const SuperAdmin = lazy(() => import('./pages/admin/SuperAdmin.tsx'))
const ResetPassword = lazy(() => import('./pages/admin/overview/ResetPassword.tsx'))
const RegisterNewClient = lazy(() => import('./pages/admin/overview/RegisterNewClient.tsx'))
const SystemReport = lazy(() => import('./pages/admin/overview/SystemReport.tsx'))

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/signin", element: <Signin /> },
      { path: "/create-feedback", element: <CreateFeedback /> },
      {
        path: "/article/how-it-works",
        element: <PublicLayout />,
        children: [
          { path: "page1", element: <HowItWorksPage1 /> },
          { path: "page2", element: <HowItWorksPage2 /> },
          { path: "page3", element: <HowItWorksPage3 /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: "/admin", element: <AdminLayout />,
        children: [
          { path: "queue/monitor", element: <ActiveQueueTicket /> },
          { path: "queue/statistics", element: <ReportsStatistics /> },
          { path: "queue/offices/feedbacks", element: <OfficesFeedbacks /> },
          { path: "settings", element: <Settings />,
            children: [
              { index: true, element: <Navigate to="profile" replace /> },
              { path: "profile", element: <ProfileSettings /> },
              { path: "security", element: <SecuritySettings /> },
              { path: "notifications", element: <NotificationSettings /> },
            ]
          },
          { path: "overview", element: <SuperAdmin />,
          children: [
            { index: true, element: <Navigate to="user-management/manage" replace /> },
            { path: "user-management/manage", element: <ResetPassword /> },
            { path: "user-management/add-client", element: <RegisterNewClient /> },
            { path: "report/system", element: <SystemReport /> },
          ]
        }
        ]
       },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster position='top-right' duration={10000} expand richColors closeButton />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
