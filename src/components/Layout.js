import Head from 'next/head'
import Nav from './Nav'

const Layout = (props) => {

    return(
        <div className="site">
            <Nav />
            <main className="contentArea">
                {props.children}
            </main>

        </div>
    )
}

export default Layout;