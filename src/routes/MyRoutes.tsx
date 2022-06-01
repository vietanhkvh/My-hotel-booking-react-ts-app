import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { routerConfig } from './routerConfig';
import MobileLayout from "../components/mobile/layout/MobileLayout";
import DesktopLayout from "../components/desktop/layout/DesktopLayout/DesktopLayout";
import Home from "../pages/Home/Home";
import Hotel from "../pages/Hotel/Hotel";
import Users from "../pages/Users/Users";
import User from "../pages/User/User";
import Searching from "../pages/Searching/Searching";
import HotelId from "../pages/Hotel/HotelId/HotelId";
import Restaurant from "../pages/Restaurant/Restaurant";
import Nopage from "../pages/Nopage/Nopage";
import ConfirmPay from "../pages/ConfirmPay/ConfirmPay";
import Success from "../pages/Success/Success";
import History from "../pages/History/History";
import HotelManager from "../pages/Host/HotelManager/HotelManager";
import RoomManager from "../pages/Host/RoomManager/RoomManager";
import ImagesManager from "../pages/Host/ImagesManager/ImagesManager";
import ImagesRoomManager from "../pages/Host/Imagesroommanager/Imagesroommanager";
import CouponManager from "../pages/Host/CouponManager/CouponManager";
import Accounts from "../pages/Admin/HostUser/HostUser";
import ActiveRequestion from "../pages/Admin/ActiveRequestion/ActiveRequestion";
import Requestion from "../pages/Admin/Requestion/Requestion";
import PaymentManager from "../pages/Host/PaymentManager/PaymentManager";
import Cart from "../pages/Cart/Cart";
import { userState } from "@src/store/reducer/userReducer";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import DashBoardHost from "../pages/Host/DashBoardHost/DashBoardHost";
import Flight from "../pages/Flight/Flight";
import FlightMobile from "../pages/mobile/FlightMobile/FlightMobile";

const MyRoutes = (props) => {
  const { isMobile } = props;

  const [update, setUpdate] = useState(Date.now());
  //   const isMobileDisplay = useRef(isMobileAndTabletCheck());
  //   const isMobile = isMobileAndTabletCheck();

  const userInfor = useSelector(
    (state: { user: userState }) => state.user?.userInfor
  );

  useEffect(() => {
    const check = () => {
      // setTimeout(checkDisplayType, 0);
      setUpdate(Date.now());
      setTimeout(() => setUpdate(Date.now()), 0);
    };
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <Routes>
      <Route
        path={"/"}
        element={isMobile ? <MobileLayout /> : <DesktopLayout />}
      >
        {/* guest */}
        <Route path={"/home"} element={<Home isMobile={isMobile} />} />
        <Route path={""} element={<Home isMobile={isMobile} />} />

        <Route path="hotel" element={<Hotel isMobile={isMobile} />}>
          <Route path=":hotelId" element={<HotelId />} />
        </Route>

        <Route path={"/restaurant"} element={<Restaurant isMobile={isMobile}/>} />        

        <Route path={"/searching"} element={<Searching />} />

        <Route
          path="users"
          element={
            <ProtectedRoute isAllowed={!!userInfor}>
              <Users />
            </ProtectedRoute>
          }
        >
          <Route
            path=":userId"
            element={
              <ProtectedRoute isAllowed={!!userInfor}>
                <User />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* host */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "HOS"}
            >
              <DashBoardHost />
            </ProtectedRoute>
          }
        />

        <Route
          path="hotel-manager"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "HOS"}
            >
              <HotelManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="room-manager"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "HOS"}
            >
              <RoomManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="payment-manager"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "HOS"}
            >
              <PaymentManager />
            </ProtectedRoute>
          }
        />

        <Route
          path="hotel-images"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "HOS"}
            >
              <ImagesManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="room-images"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "HOS"}
            >
              <ImagesRoomManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="coupon-manager"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "HOS"}
            >
              <CouponManager />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="host-manager"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "ADM"}
            >
              <Accounts type="HOS" />
            </ProtectedRoute>
          }
        />
        <Route
          path="guest-manager"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "ADM"}
            >
              <Accounts type="GUE" />
            </ProtectedRoute>
          }
        />
        <Route
          path="de-active-requestion"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "ADM"}
            >
              <ActiveRequestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="host-requestion"
          element={
            <ProtectedRoute
              isAllowed={!!userInfor && userInfor?.ID_Role === "ADM"}
            >
              <Requestion />
            </ProtectedRoute>
          }
        />

        <Route path={"*"} element={<Nopage />} />
        {/* {routerConfig.map((r: any) => {
        const { component, needAuthor, grantPermision, ...rest } = r;
        const mode = isMobileAndTabletCheck() ? 'mobile' : 'desktop';

        const Component =
          r?.component?.[mode]?.page || r?.component?.[mode] || r?.component;

        const ChildComponent =
          r?.componentChild?.[mode]?.page ||
          r?.componentChild?.[mode] ||
          r?.componentChild;
        const PublicLayout = isMobileAndTabletCheck()
          ? MobileLayout
          : DesktopLayout;

        const Layout =
          r?.component?.[mode]?.layout || r?.['layout'] || PublicLayout;
        return (
          // <Route key={r?.path} path={'/'} element={<Layout />}>
            !r?.childPath ? (
              <Route path={r?.path} element={<Component />}>
                <Route
                  path={r?.childPath}
                  element={<ChildComponent />}
                />
              </Route>
            ) : (
              <>
                {console.log('r childPath 2')}
                <Route path={r?.path} element={<Component {...rest} />} />
              </>
            )
          // </Route>
        );
      })} */}
      </Route>
      <Route path={"/flight"} element={ isMobile? <Flight isMobile={isMobile}/> : <FlightMobile/>} />
      <Route path={"/event"} element={<Restaurant isMobile={isMobile}/>} />
      <Route path="book" element={<ConfirmPay />} />
      <Route
        path="book-success"
        element={
          <ProtectedRoute
            isAllowed={!!userInfor && userInfor?.ID_Role === "GUE"}
          >
            <Success />
          </ProtectedRoute>
        }
      />
      <Route
        path="history"
        element={
          <ProtectedRoute
            isAllowed={!!userInfor && userInfor?.ID_Role === "GUE"}
          >
            <History />
          </ProtectedRoute>
        }
      />
      <Route path="itinerary" element={<Cart />} />
    </Routes>
  );
};
export default MyRoutes;
