import { StyleSheet, Dimensions } from 'react-native'

const d = Dimensions.get('window')

export default StyleSheet.create({
  buttonsContainer: {
    marginTop: '5%',
    marginBottom: '5%',
    width: '50%',
    borderRadius: 100,
  },
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#ffffff',

  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 0.5,
    marginTop: '15%',
    width: '97%',
  },
  image: {
    position: 'absolute',
    flex: 1,
    width: d.width,
    height: d.height * 0.6,
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  modalLoadingContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    margin: 2,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    backgroundColor: 'rgba(100,100,100,0.1)',
    borderColor: '#000000',
    alignSelf: 'stretch',
    borderRadius: 12,
  },
  tittles: {
    fontSize: 20,
    color: 'black',
    marginBottom: '2%',
  },
})
