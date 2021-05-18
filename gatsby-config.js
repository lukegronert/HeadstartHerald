module.exports = {
  siteMetadata: {
    title: "First Site",
  },
  plugins: ["gatsby-plugin-gatsby-cloud",
            'gatsby-plugin-postcss',
            {
              resolve: 'gatsby-source-filesystem',
              options: {
                name: 'src',
                path: `${__dirname}/src/`,
              },
            },
            'gatsby-transformer-remark',
            `gatsby-plugin-sharp`,
            {
              resolve: `gatsby-transformer-remark`,
              options: {
                plugins: [
                  {
                    resolve: `gatsby-remark-images`,
                    options: {
                      // It's important to specify the maxWidth (in pixels) of
                      // the content container as this plugin uses this as the
                      // base for generating different widths of each image.
                      maxWidth: 590,
                    },
                  },
                ],
              },
            },
          ],
};
