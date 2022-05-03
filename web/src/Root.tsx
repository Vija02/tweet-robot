import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import HomeIndex from "./containers/Home"

function Root() {
	return (
		<Routes>
			<Route path="/" element={<HomeIndex />} />
		</Routes>
	)
}

export default Root
