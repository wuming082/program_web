export default{
    template:/*html*/`
        <h1>IP:{{ipfile}}</h1>
        <button>{{click}}</button>
    `,
    data(){
        return {
            click: 'Click',
            iplocation: '192.168.31.1'
        };
    },    
    props: {
        ipfile: String
    }
}