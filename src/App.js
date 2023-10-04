import {
  Route,
  Routes,
  BrowserRouter,
  Router,
  Switch,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Error from "pages/error";
import Login from "./pages/login";
import Profile from "pages/profile";
import Setting from "pages/setting";
import Advanced from "pages/advanced";
import Header from "components/header";
import Reporting from "pages/reporting";
import Requirements from "pages/requirements";
import { allRoutes } from "constants/allRoutes";
import AddProfile from "pages/profile/add-profile";
import UploadBulkProfile from "pages/upload-bulk-profile";
import ProfileDetails from "pages/profile/profile-details";
import AddRequirements from "pages/requirements/add-requirements";
import NewRequirements from "pages/requirements/new-requirements";
import SaveRequirements from "pages/requirements/save-requirements";
import MyProfile from "pages/my-profile";
import AddProfilePopup from "pages/add-profile-popup";
import AdvancedSetting from "pages/advanced-setting";
import UpdateRequirements from "pages/requirements/update-requirements";
import RequirementDetails from "pages/requirements/details-requirements";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "token");
    if (token !== "undefined" && token !== null && token !== undefined) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      navigate(allRoutes.login);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuth(true);
  };

  return (
    <>
      {isAuth ? (
        <>
          <Header />

          <Routes>
            <Route path={allRoutes.home} element={<Requirements />} />
            <Route
              path={allRoutes.addRequirements}
              element={<AddRequirements />}
            />
            <Route
              path={allRoutes.updateRequirements}
              element={<UpdateRequirements />}
            />
            <Route
              path={allRoutes.saveRequirements}
              element={<SaveRequirements />}
            />
            <Route
              path={allRoutes.newRequirements}
              element={<NewRequirements />}
            />
            <Route
              path={allRoutes.requirementsDetail}
              element={<RequirementDetails />}
            />
            <Route path={allRoutes.profile} element={<Profile />} />
            <Route path={allRoutes.addProfile} element={<AddProfile />} />
            <Route
              path={allRoutes.profileDetails}
              element={<ProfileDetails />}
            />
            <Route path={allRoutes.reporting} element={<Reporting />} />
            <Route path={allRoutes.myProfile} element={<MyProfile />} />
            <Route
              path={allRoutes.addProfilePopup}
              element={<AddProfilePopup />}
            />
            <Route
              path={allRoutes.uploadBulkProfile}
              element={<UploadBulkProfile />}
            />
            <Route path={allRoutes.advanced} element={<Advanced />} />
            <Route
              path={allRoutes.advancedSetting}
              element={<AdvancedSetting />}
            />
            <Route path={allRoutes.setting} element={<Setting />} />
            <Route path={allRoutes.error} element={<Error />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route
            path={allRoutes.login}
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
