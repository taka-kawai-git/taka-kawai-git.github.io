export const getHashedColor = {
    data() {
        return {
        }
    },
    computed: {
        colorObg: function(string_id) {
            var color = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
            'teal', 'green', 'light-green', 'orange', 'deep-orange', 'brown', 'blue-grey'];
            // grey, yellow, lime, amber
            return function (string_id) {
                var num_id = string_id.charCodeAt(0) + string_id.charCodeAt(1) 
                            + string_id.charCodeAt(2) + string_id.charCodeAt(3);
                return [color[num_id % color.length], color[num_id % color.length] + '-text'];
            };
        }
    }
}