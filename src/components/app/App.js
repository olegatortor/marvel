import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const ProblemPage = lazy(() => import('../pages/ProblemPage'));
const SingleComic = lazy(() => import('../pages/SingleComicPage'));
const SingleChar = lazy(() => import('../pages/SingleCharPage'));


const App = () => {
    return (
        <Router>
             <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicId" element={<SingleComic/>}/>
                            <Route path="/char/:charId" element={<SingleChar/>}/>
                            <Route path="*" element={<ProblemPage/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}


export default App;