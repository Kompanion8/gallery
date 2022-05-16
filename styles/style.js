import { StyleSheet } from "react-native"

export const Style = StyleSheet.create({
    title: {
        fontFamily: 'FiraSans-Light',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        maxWidth:170
    },
    text: {
        fontFamily: 'FiraSans-Light',
        color: 'white',
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor:"#004445"
    },
    header: {
        flexDirection:'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        backgroundColor: '#004445'
    },
    albumList: {
        backgroundColor: "#021C1E",
        height:'100%'
    },
    album: {
        flexDirection:'row',
        padding: 10,
        borderWidth: 1,
        borderColor:'#021C1E',
        borderBottomColor: '#6FB98F',
        justifyContent: 'space-between',
        backgroundColor:'#021C1E'
    },
    name: {
        padding: 16,
        flex:1,
        alignItems: 'flex-start',
    },
    hidden: {
        backgroundColor: '#2C7873',
        height: 130,
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        width: 200,
        justifyContent:'space-between'
        
        
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#021C1E'
    },
    albumContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})