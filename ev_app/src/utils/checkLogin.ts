import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; 


export const checkLoginStatus = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            const decoded: any = jwtDecode(accessToken);
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp > currentTimestamp) {
                return true; 
            } else {
                await AsyncStorage.removeItem('accessToken'); 
            }
        }
        return false; 
    } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', error);
        return false;
    }
};