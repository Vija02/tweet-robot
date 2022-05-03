import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import HomeIndex from "containers/Home";
import SharedLayout from "containers/SharedLayout";

function Root() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<HomeIndex />} />
      </Route>
    </Routes>
  );
}

export default Root;
