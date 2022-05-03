import { Route, Routes } from "react-router-dom";

import DraftsIndex from "containers/DraftsIndex";
import HomeIndex from "containers/Home";
import SharedLayout from "containers/SharedLayout";

function Root() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/drafts/:id" element={<DraftsIndex />} />
      </Route>
    </Routes>
  );
}

export default Root;
