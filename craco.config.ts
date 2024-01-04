import { CracoConfig } from '@craco/types';

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

    webpack: {
        configure: {
            module: {
                rules: [
                    {
                        test: /\.yaml$/,
                        use: 'yaml-loader'
                    }
                ]
            }
        }
    }
}

export default cracoConfig;


// module.exports = {
//     devServer: {
//         port: 8080,
//         proxy: {
//             '/mock': {
//                 target: 'http://localhost:9900',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/mock': ''
//                 }
//             },
//         }
//     },
//     webpack: {
//         resolve: {
//             fallback: {
//                 "vm": require.resolve("vm-browserify"),
//             }
//         }
//     }
// }

