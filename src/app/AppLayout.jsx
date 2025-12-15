import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes";
import '../css/Navbar.css'


export default function AppLayout() {
    return (
        <div>
            <nav>
                <ul>
                <li>
                    <NavLink to={ROUTES.topicsRoute()} >
                    Topics
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.newTopicRoute()}>
                    New Topic
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.quizzesRoute()} >
                    Quizzes
                    </NavLink>
                </li>
                <li>
                    <NavLink to={ROUTES.newQuizRoute()} >
                    New Quiz
                    </NavLink>
                </li>
                </ul>
            </nav>
            <Outlet/>
        </div>
      

    );
}
