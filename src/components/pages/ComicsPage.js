
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBaner from '../appBanner/AppBanner'

const ComicsPage = () => {
    return(
        <>
            <ErrorBoundary> 
                <AppBaner />
                <ComicsList />
            </ErrorBoundary> 
        </>
    )
}

export default ComicsPage;