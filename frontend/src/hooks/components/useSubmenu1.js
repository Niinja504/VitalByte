import { useState } from 'react';

export function useSubmenu1() {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalVisible(true);
        setIsRegisterModalVisible(false);
    };

    const closeLoginModal = () => {
        setIsLoginModalVisible(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalVisible(true);
        setIsLoginModalVisible(false);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalVisible(false);
    };

    return {
        isLoginModalVisible,
        isRegisterModalVisible,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal
    };
}
