import { StyleSheet, Dimensions } from 'react-native'

const d = Dimensions.get('window')

export default StyleSheet.create({
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  image: {
    position: 'absolute',
    flex: 1,
    width: d.width,
    height: d.height * 0.6,
  },
  searchInput: {
    margin: 2,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    backgroundColor: 'rgba(187,226,268,0.5)',
    borderColor: '#000000',
    alignSelf: 'stretch',
    borderRadius: 12,
  },
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogin: {
    marginTop: '10%',
    width: '25%',
    borderRadius: 100,
  },
})
