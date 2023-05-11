import './App.css';
import GlobalStyle from './components/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
import { isLoading } from '~/selectors';
function App() {
    const loading = useSelector(isLoading);
    if (loading) return <Loading />;
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = GlobalStyle;
                        if (route.onlyContent)
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<Page />}
                                />
                            );
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
