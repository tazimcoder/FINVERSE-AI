/**

* ==========================================================
* FINVERSE AI
* Root Application
* ==========================================================
*
* Responsibility:
*
* * Root application entry
* * Delegate application routing to AppRoutes
*
* IMPORTANT:
*
* * No page logic
* * No authentication logic
* * No Admin logic
* * No API calls
*
* ==========================================================
  */

import AppRoutes from "./routes/AppRoutes";

function App() {

  return <AppRoutes />;

}

export default App;

