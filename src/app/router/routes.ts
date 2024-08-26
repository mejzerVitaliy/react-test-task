import EditUserPage from "../../pages/EditUserPage"
import UserPage from "../../pages/UserPage"

interface Routes {
    path: string,
    element: React.FC
}

export const routes: Routes[] = [
    { path: '/users', element: UserPage  },
    { path: '/editUsers', element: EditUserPage }
]