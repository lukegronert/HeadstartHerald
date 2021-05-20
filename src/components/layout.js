import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Navbar, NavbarBrand } from 'reactstrap';

const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(
        graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
        `
    )
    return (
        <main>
            <div className='bg-gradient-to-r from-green-400 to-blue-500'>
                <title>{pageTitle}</title>
                <div className="container p-0">
                    <Navbar color='dark' dark className='mb-4 shadow-lg'>
                        <NavbarBrand href='/' className='mr-auto ml-4'>Headstart Herald</NavbarBrand>
                    </Navbar>
                    <div className='bg-gray-300 shadow-lg'>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Layout