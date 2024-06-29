import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createProfile } from '../../store/actions/profileAction';
import { Button } from '../components/ButtonComponent';
import { Input } from '../components/InputComponent';

const RegisterScreen = (props) => {

    // Kumpulan Variabel
    // Var untuk console log
    const { navigation } = props;
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    // Format Email
    const [
        isEmailFormat,
        setIsEmailFormat
    ] = useState(true);

    // Format Password
    const [
        isPassVisible,
        setIsPassVisible
    ] = useState(false);



    // Kumpulan Function
    const dispatch = useDispatch();
    const onChangeInput = (inputType, value) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (inputType === 'email') {
            if (!emailRegex.test(value)) {
                setIsEmailFormat(false);
            } else {
                setIsEmailFormat(true);
            };
        };

        setForm({
            ...form,
            [inputType]: value
        });
    };
    const sendData = () => {
        if (form.username === '' || form.email === '' || form.password === '' || !isEmailFormat) {
            alert('Make sure you fill all the field with the right information!');
        }
        else {
            dispatch(createProfile(form));
            Alert.alert(
                "Success",
                "Successfully create an account!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('Login')
                    }
                ]
            );
        }
    }
    const globalProfileData = useSelector(store => store.profileReducer);

    // Kumpulan UseEffect
    // untuk Mengeluarkan Log di Metro, dari GlobalProfileData
    useEffect(() => {
        console.log('GLOBAL STATE ON REGISTER PAGE');
        console.log(globalProfileData);
        if (form.email === '') {
            setIsEmailFormat(true);
        }
    }, [globalProfileData, form.email]);

    // untuk men-Dispatch profiles
    // useEffect(() => {
    //     dispatch(createProfile({
    //         username: 'Bilal',
    //         email: 'bilal@gmail.com',
    //         password: 'Nword123'
    //     })
    //     )
    // }, []);
    useEffect(() => {
        console.log('LOCAL STATE');
        console.log('username: ' + form.username);
        console.log('email : ' + form.email);
        console.log('password : ' + form.password);
    }, [form]);

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.mainContainer}>
                <View style={styles.inputContainer}>
                    <Input
                        title="Username"
                        placeholder="Username"
                        onChangeText={
                            (text) => onChangeInput('username', text)
                        }
                    />
                    <Input
                        title="Email"
                        placeholder="Email"
                        onChangeText={
                            (text) => onChangeInput('email', text)
                        }
                    />
                    {
                        isEmailFormat ?
                            null
                            :
                            <View style={styles.wawrningContainer}>
                                <Text style={styles.warning}>
                                    Please input the right email format !
                                </Text>
                            </View>
                    }
                    <Input
                        title="Password"
                        placeholder="Password"
                        onChangeText={
                            (text) => onChangeInput('password', text)
                        }
                        isPassword={true}
                        secureTextEntry={isPassVisible ? false : true}
                        iconName={isPassVisible ? 'eye-off' : 'eye'}
                        onPress={() => setIsPassVisible(!isPassVisible)}
                    />
                </View>

                <Button
                    text="Register"
                    onPress={() => sendData()}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={
                        () => navigation.navigate('Login')
                    }>
                        <Text style={styles.loginText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#E6E6FA',
        alignItems: 'center'
    },
    inputContainer: {
        padding: 16,
        width: '100%'
    },
    textContainer: {
        flexDirection: 'row',
        marginTop: 16,
        // alignItems: 'center'
    },
    text: {
        fontSize: 16
    },
    loginText: {
        color: '#1A5B0A',
        fontSize: 16,
        marginLeft: 4
    },
    wawrningContainer: {
        marginBottom: 16,
        marginLeft: 16
    },
    warning: {
        color: 'red'
    }
})