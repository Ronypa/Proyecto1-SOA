import * as React from 'react'
import {
    Button,
    Text,
    TextInput,
    View,
    ActivityIndicator,
    Modal,
    Alert,
} from 'react-native'

import styles from './styles'

export default class Configuration extends React.Component {
static navigationOptions = {
    title: 'Configuración',
};

// constructur and State variables
constructor(props) {
    super(props)
    this.userName = this.props.navigation.state.params.userName
    this.state = {
        passwordString: '',
        newPasswordString: '',
        modalLoading: false,
        interval: '',
        ip: this.props.navigation.state.params.ip,
    }
}

// method to change interval of request messages status
_onChangeItervalPressed = async () => {
    this.setState({ modalLoading: true })
    const response = await fetch(`${this.state.ip }/api/v1/user/interval`, {
        // send the request
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.userName,
            interval: Number(this.state.interval),
        }),
    }).catch((error) => {
        Alert.alert(`Ocurrió el siguiente error en la operación: ${ error}`)
        this.setState({ modalLoading: false })
        return -1
    })
    this.setState({ modalLoading: false })
    if (response.status !== 200) {
        Alert.alert('No fue posible realizar la acción')
        return
    }
    this.setState({ interval: '' })
    Alert.alert(
        'Solicitud realizada con éxito. Los cambios se aplicarán en el siguiente inicio de sesión',
    )
};

// method to send the requests
_onChangePasswordPressed = async () => {
    this.setState({ modalLoading: true })
    const response = await fetch(`${this.state.ip }/api/v1/user/password`, {
        // send the request
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.userName,
            password: this.state.passwordString,
            newPassword: this.state.newPasswordString,
        }),
    }).catch((error) => {
        Alert.alert(`Ocurrió el siguiente error en la operación: ${ error}`)
        this.setState({ modalLoading: false })
        return -1
    })
    this.setState({ modalLoading: false })
    const data = await response.json()
    if (data.message === 'Old password incorrect') {
        // if current password wrong
        Alert.alert('Contraseña actual incorrecta')
        return
    } if (response.status !== 200) {
        Alert.alert('No fue posible realizar la acción')
        return
    }
    this.setState({ passwordString: '', newPasswordString: '' })
    Alert.alert('Contraseña cambiada con éxito')
};

// when the interval input changes
_onIntervalTextChanged = (event) => {
    this.setState({ interval: event.nativeEvent.text })
};

// When the new password InputText changes
_onNewPasswordTextChanged = (event) => {
    this.setState({
        newPasswordString: event.nativeEvent.text,
    })
};

// When the password InputText changes
_onPasswordTextChanged = (event) => {
    this.setState({
        passwordString: event.nativeEvent.text,
    })
};

// Render Function
render() {
    return (
        <View style={styles.container}>
            {/* Modal for Loading Spinner */}
            <Modal
                animationType="fade"
                transparent
                visible={this.state.modalLoading}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalLoadingContainer}>
                        <ActivityIndicator size={80} color="#0000ff" />
                    </View>
                </View>
            </Modal>
            {/* Change Password Inputs */}
            <View style={styles.flowRight}>
                <Text style={styles.tittles}>Cambiar contraseña</Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.searchInput}
                    placeholder="Contraseña actual"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    onChange={this._onPasswordTextChanged}
                    value={this.state.passwordString}
                />
                <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.searchInput}
                    placeholder="Contraseña nueva"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    onChange={this._onNewPasswordTextChanged}
                    value={this.state.newPasswordString}
                />
                <View style={styles.buttonsContainer}>
                    <Button
                        disabled={this.state.passwordString === ''
|| this.state.newPasswordString === ''}
                        onPress={this._onChangePasswordPressed}
                        title="Cambiar contraseña"
                    />
                </View>
            </View>
            {/* Change interval  */}
            <View style={styles.flowRight}>
                <Text style={styles.tittles}>
Cambiar intervalo de solicitud de mensajes de seguridad


                </Text>
                <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.searchInput}
                    placeholder="Ingrese el valor en segundos"
                    placeholderTextColor="#aaaaaa"
                    keyboardType="numeric"
                    onChange={this._onIntervalTextChanged}
                    value={this.state.interval}
                />
                <View style={styles.buttonsContainer}>
                    <Button
                        onPress={this._onChangeItervalPressed}
                        disabled={this.state.interval === ''}
                        title="Cambiar intervalo"
                    />
                </View>
            </View>
        </View>
    )
}
}
