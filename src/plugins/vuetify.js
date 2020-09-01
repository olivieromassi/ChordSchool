import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
//import '@mdi/font/css/materialdesignicons.css'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    iconfont:'md',
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light:  {
                primary: '#00bcd4',
                secondary: '#ffeb3b',
                accent: '#4caf50',
                error: '#8bc34a',
                warning: '#00bcd4',
                info: '#009688',
                success: '#673ab7'
            },
            dark: {
                primary: colors.blue.lighten3,
            },
        },
        dark: false
    }
    /*
    theme: {
        dark: true,
    },
    */
});
