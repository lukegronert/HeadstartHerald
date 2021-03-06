// Step 1: Import React
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImgOverlay, CardImg, ButtonToggle } from 'reactstrap';

// Step 2: Define your component
const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
    <div className='shadow-lg'>
    {/* div containing all of the blog posts, including the featured cover article */}
    {/* div is using CSS grid, 3 columns per row */}
      <div className='grid grid-cols-1 auto-rows-auto lg:grid-cols-3 lg:gap-6'>
      {/* Map over the array of markdown files (the articles) */}
          {data.allMarkdownRemark.edges.map(({ node }, index) => {
            {/* If it is most recent article, display it in the large features section of the home page */}
            if(index === 0) {
              return (<div key={node.id} className='order-first col-start-1 col-end-2 lg:col-start-1 lg:col-end-4 mb-6'>
                    <div className=''>
                      <Card className='h-1/4' style={{ border: 'transparent' }}>
                        <CardImg className='h-full' src='https://images.unsplash.com/photo-1601827081278-687be6a60fae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=822&q=80' alt='image' />
                        <CardImgOverlay className='p-0'>
                        <Link className='no-underline' to={node.fields.slug}>
                        <div className='w-2/4 mx-auto text-white' style={{ position: 'absolute', bottom: '20%', left: '10%' }}>
                          <CardTitle tag="h5">{node.frontmatter.title}</CardTitle>
                          <CardSubtitle tag="h6" className="mb-2"><span className='hidden md:block'>Written by </span>{node.frontmatter.author} <span className='hidden md:block float-right'>{node.frontmatter.date}</span></CardSubtitle>
                          <CardText className='hidden md:block'>{node.excerpt}</CardText>
                          <ButtonToggle>Read here</ButtonToggle>
                        </div>
                        </Link>
                        </CardImgOverlay>
                      </Card>
                    </div>
              </div>)
              {/* For the rest of the articles, put one in each column per row */}
            } else {
            return (
              <div className='h-1/2 hover:opacity-75 w-11/12 mx-auto order-last col-start-1 col-end-2 lg:col-span-1' key={node.id}>
                  <Link className='no-underline' to={node.fields.slug}>
                    <div className=''>
                      <Card className='text-black' style={{ border: 'transparent' }}>
                        <GatsbyImage image={getImage(node.frontmatter.image)} alt='image' />
                        <CardBody>
                          <CardTitle tag="h5">{node.frontmatter.title}</CardTitle>
                          <CardSubtitle tag="h6" className="mb-2 text-gray-700">{node.frontmatter.author} <span className='float-right'>{node.frontmatter.date}</span></CardSubtitle>
                          <CardText className="text-black">{node.excerpt}</CardText>
                          <ButtonToggle>Read more ></ButtonToggle>
                        </CardBody>
                      </Card>
                    </div>
                  </Link>
              </div>
            )}
          })
          }
          {/* Added order-2 class to put this div after the featured article and before the rest of the articles */}
          <div className='order-2 col-start-1 col-end-4 mx-3 border-l-8 border-gray-700 mb-4'>
            Recent Articles:
          </div>
      </div>
    </div>
    </Layout>
  )
}
// Step 3: Export your component
export default IndexPage
export const query = graphql`
  query articles {
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          frontmatter {
            date
            title
            author
            image {
              childImageSharp {
                gatsbyImageData(width: 200, placeholder: BLURRED, formats: AUTO)
              }
              publicURL
            }
          }
          fields {
            slug
          }
          excerpt (pruneLength: 300)
          id
        }
      }
      totalCount
    },
  }   
`