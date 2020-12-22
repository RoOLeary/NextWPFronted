import Head from 'next/head'
import Nav from './Nav'

const Layout = ({ children }) => {

    return(
        <div className="site">
            <Nav />
            <main className="contentArea">
                {children}
            </main>

        </div>
    )
}

export default Layout;