import React from 'react'
import {useUser} from './context/user-context'
import {FullPageSpinner} from './components/lib'

const loadAuthenticatedApp = () => import('./authenticated-app')
const AuthenticatedApp = React.lazy(loadAuthenticatedApp)
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const user = useUser()
  // pre-load the authenticated side in the background while the user's
  // filling out the login form.
  React.useEffect(() => {
    loadAuthenticatedApp()
  }, [])
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App

// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Books from "./pages/Books";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Nav />
//         <Switch>
//           <Route exact path="/" component={Books} />
//           <Route exact path="/books" component={Books} />
//           <Route exact path="/books/:id" component={Detail} />
//           <Route component={NoMatch} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;
