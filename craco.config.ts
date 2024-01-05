import { CracoConfig, CracoWebpackConfig } from '@craco/types';

const cracoConfig: CracoConfig = {
    devServer: {
        port: 8080,
        proxy: {
            '/mock': {
                target: 'http://localhost:9900',
                changeOrigin: true,
                pathRewrite: {
                    '^/mock': ''
                }
            },
        }
    },
    // webpack: {
    //     configure: {
    //         entry: {
    //            index: './src/index.tsx',
    //         },
    //         output: {
    //             filename: 'main.js',
    //         }
    //     }
    // }
    
    webpack: {
        configure: (config, {paths}) => {
            config.entry = {
                main: './src/index.tsx',
                // test: './src/dync.tsx',
            };
            config.output = {
                path: '/Users/yjg/works/vscode/react-decorator/build',
                // filename: 'static/js/[name].[contenthash:8].js',
                filename: 'static/js/[name].js',
                // chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
                // chunkFilename: (pathData, assetInfo) => {
                //     console.log('pathData', pathData, assetInfo);
                //     return pathData.chunk?.name === 'main'? '[name].js': '[name]/[name].js';
                // },
                publicPath: '/',
            }

            // config.optimization = {
            //     splitChunks: {
            //         chunks: 'all',
            //     },
            //     runtimeChunk: 'multiple',
            // }
            return config;
        },
    },

}

export default cracoConfig;



