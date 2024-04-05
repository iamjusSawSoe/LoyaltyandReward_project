import AdminUserAccountsListing from "@/pages/adminUserAccounts/AdminUserAccountsListing";
import CampaignListing from "@/pages/campaign/CampaignListing";
import Merchant from "@/pages/merchant/Merchant";
import RoleAndPermission from "@/pages/RoleAndPermission";
import { Navigate, RouteObject } from "react-router-dom";
import AuthenticatedLayout from "../../app/Layout/AuthenticatedLayout";
import CustomerListing from "../../pages/CustomerListing";
import Demo from "../../pages/Demo/Demo";
import LoyaltyItemListing from "../../pages/LoyaltyItemListing";
import PointTransactionListing from "../../pages/PointTransactionListing";
import { ProtectedRoute } from "../ProtectedRoute";

export const authenticatedRoutes: RouteObject[] = [
  {
    path: "*",
    element: <Navigate to="/customer" />,
  },
  {
    path: "/demo",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout singleCard={false}>
          <Demo />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
    errorElement: <p>An error occurred while loading the Service Page.</p>,
  },
  {
    path: "/customer",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <CustomerListing />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/point-transaction",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <PointTransactionListing />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/loyalty-item",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <LoyaltyItemListing />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/merchant",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <Merchant />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/campaign",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <CampaignListing />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout>
          <AdminUserAccountsListing />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/role-and-permissions",
    element: (
      <ProtectedRoute>
        <AuthenticatedLayout singleCard={false}>
          <RoleAndPermission />
        </AuthenticatedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/logout",
    element: <div>Logout</div>,
  },
];
