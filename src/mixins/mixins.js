import moment from 'moment'

export const dateMixin = {
    methods: {
        formatDate(str, outputFormat) {
            return moment(str).format(outputFormat);
        },
        diffForHumans(str) {
            return moment(str).fromNow();
        }
    }
}