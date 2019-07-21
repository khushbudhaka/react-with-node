import Dashboard from "./views/Dashboard.jsx";
import Doctors from "./views/Doctors.jsx";
import Nurse from "./views/Nurse.jsx";
import Patient from "./views/Patient.jsx";
import UserProfile from "./views/UserProfile.jsx";
import TableList from "./views/TableList.jsx";
import Typography from "./views/Typography.jsx";
import Icons from "./views/Icons.jsx";
import Maps from "./views/Maps.jsx";
import Notifications from "./views/Notifications.jsx";
import Upgrade from "./views/Upgrade.jsx";
import addDoctor from "./views/addDoctor.jsx";
import addNurse from "./views/addNurse.jsx";
import addPatient from "./views/addPatient.jsx";
import editDoctor from "./views/editDoctor.jsx";
import editNurse from "./views/editNurse.jsx";
import editPatient from "./views/editPatient.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/doctors",
    name: "Doctors",
    icon: "pe-7s-user",
    component: Doctors,
    layout: "/admin"
  },
  {
    path: "/nurse",
    name: "Nurse",
    icon: "pe-7s-user",
    component: Nurse,
    layout: "/admin"
  },
  {
    path: "/patient",
    name: "Patient",
    icon: "pe-7s-user",
    component: Patient,
    layout: "/admin"
  },
  {
    path: "/addDoctor",
    name: "AddDoctor",
    icon: "pe-7s-bell",
    component: addDoctor,
    layout: "/admin"
  },
  {
    path: "/editDoctor/:doctorId",
    name: "EditDoctor",
    icon: "pe-7s-bell",
    component: editDoctor,
    layout: "/admin"
  },
  {
    path: "/addNurse",
    name: "AddNurse",
    icon: "pe-7s-bell",
    component: addNurse,
    layout: "/admin"
  },
  {
    path: "/editNurse/:nurseId",
    name: "EditNurse",
    icon: "pe-7s-bell",
    component: editNurse,
    layout: "/admin"
  },
  {
    path: "/addPatient",
    name: "AddPatient",
    icon: "pe-7s-bell",
    component: addPatient,
    layout: "/admin"
  },
  {
    path: "/editPatient/:patientId",
    name: "Editpatient",
    icon: "pe-7s-bell",
    component: editPatient,
    layout: "/admin"
  }
];

export default dashboardRoutes;
