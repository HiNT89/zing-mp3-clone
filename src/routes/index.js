import configRoutes from '~/config';

// Layouts

// Pages
import Home from '~/containers/Home';
import Libary from '~/containers/Libary';
import ZingChart from '~/containers/ZingChart';
import Login from '~/containers/Login';
import Signup from '~/containers/Signup';
import Singer from '~/containers/Singer';
import Search from '~/containers/Search';
import NewSong from '~/containers/NewSong';
import PlaylistPage from '~/containers/PlaylistPage';
// Public routes
const publicRoutes = [
    { path: configRoutes.home, component: Home },
    { path: configRoutes.newSong, component: NewSong },
    { path: configRoutes.search, component: Search },
    { path: configRoutes.playlist, component: PlaylistPage },
    { path: configRoutes.libary, component: Libary },
    { path: configRoutes.zingchart, component: ZingChart },
    { path: configRoutes.singer, component: Singer },
    { path: configRoutes.login, component: Login, onlyContent: true },
    { path: configRoutes.signup, component: Signup, onlyContent: true },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
