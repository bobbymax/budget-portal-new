/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./views/auth/Login";
import Dashboard from "./views/Dashboard";
import PreLoader from "./components/commons/PreLoader";
import Settings from "./views/modules/configuration/Settings";
import Modules from "./views/modules/Modules";
import Module from "./views/modules/Module";
import Roles from "./views/modules/administration/Roles";
import Groups from "./views/modules/administration/Groups";
import Departments from "./views/modules/administration/Departments";
import Employees from "./views/modules/administration/Employees";
import BudgetHeads from "./views/modules/budget/BudgetHeads";
import SubBudgetHeads from "./views/modules/budget/SubBudgetHeads";
import Fund from "./views/modules/budget/Fund";

const App = () => {
  return (
    <Suspense fallback={<PreLoader />}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/applications"
          element={
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/applications/:id"
          element={
            <ProtectedRoute>
              <Module />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/roles"
          element={
            <ProtectedRoute>
              <Roles />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/staff"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/budget-heads"
          element={
            <ProtectedRoute>
              <BudgetHeads />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/sub-budget-heads"
          element={
            <ProtectedRoute>
              <SubBudgetHeads />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/funds"
          element={
            <ProtectedRoute>
              <Fund />
            </ProtectedRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default App;
