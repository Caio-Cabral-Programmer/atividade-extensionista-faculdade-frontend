import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
import { Spinner } from "../components/ui/Spinner";
import { PageWrapper } from "../components/layout/PageWrapper";

const Landing = lazy(() => import("../pages/Landing"));
const ConfirmEmail = lazy(() => import("../pages/Auth/ConfirmEmail"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Transactions = lazy(() => import("../pages/Transactions"));
const Accounts = lazy(() => import("../pages/Accounts"));
const Categories = lazy(() => import("../pages/Categories"));
const Budgets = lazy(() => import("../pages/Budgets"));
const Goals = lazy(() => import("../pages/Goals"));

export function AppRouter() {
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Transactions />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Accounts />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Categories />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/budgets"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Budgets />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals"
          element={
            <ProtectedRoute>
              <PageWrapper>
                <Goals />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
