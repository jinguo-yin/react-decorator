import {CracoConfig} from '@craco/types';

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
    }
}

export default cracoConfig;