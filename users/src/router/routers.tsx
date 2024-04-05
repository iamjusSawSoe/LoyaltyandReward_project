import { Navigate, Route, Routes } from "react-router-dom";
import ActivateOTP from "../pages/ActivateOTP";
import ClaimedPoints from "../pages/ClaimedPoints";
import CollectPoints from "../pages/CollectPoints";
import EnterPhoneNo from "../pages/EnterPhoneNo";
import EnterPin from "../pages/EnterPin";
import ForgotPin from "../pages/ForgotPin";
import HistoryViewAll from "../pages/HistoryViewAll";
import MyPoints from "../pages/MyPoints";
import ResetPin from "../pages/ResetPin";
import SuccessPage from "../pages/SuccessPage";
import { ProtectedRoute } from "../router/ProtectedRoute";

const NotFound = () => {
  return <Navigate to="/" />;
};

export default function RouterRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<CollectPoints />} />
      <Route path="/collect-points" element={<CollectPoints />} />
      <Route path="/enter-phone-no" element={<EnterPhoneNo />} />

      <Route
        path="/enter-pin"
        element={
          <ProtectedRoute>
            <EnterPin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activation"
        element={
          <ProtectedRoute>
            <ActivateOTP />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-pin"
        element={
          <ProtectedRoute>
            <ForgotPin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/claimed-points"
        element={
          <ProtectedRoute>
            <ClaimedPoints />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reset-pin"
        element={
          <ProtectedRoute>
            <ResetPin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-points"
        element={
          <ProtectedRoute>
            <MyPoints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-all-history"
        element={
          <ProtectedRoute>
            <HistoryViewAll />
          </ProtectedRoute>
        }
      />

      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <SuccessPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
