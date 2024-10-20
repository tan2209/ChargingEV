import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Header from '../account/component/Header';

export default function PolicyScreen({ navigation}: any ) {
  const handleNavBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  const handleOpenLink = () => {
    Linking.openURL('https://ev-charging-station-admin.vercel.app/privacy-policy');
  };
  return (
    <View style={styles.container}>
      <Header title="Chính sách bảo mật" action={handleNavBack} />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.heading}>1. Giới thiệu</Text>
          <Text style={styles.text}>
            Ứng dụng VietEV cam kết bảo vệ quyền riêng tư của người dùng. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, bảo vệ và chia sẻ thông tin cá nhân của bạn khi bạn sử dụng.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>2. Thông tin chúng tôi thu thập</Text>
          <Text style={styles.text}>
            Chúng tôi có thể thu thập các loại thông tin sau từ bạn:
          </Text>
          <Text style={styles.listItem}>-  Thông tin cá nhân: Bao gồm tên, số điện thoại, địa chỉ email, và thông tin thanh toán.</Text>
          <Text style={styles.listItem}>-  Thông tin thiết bị: Loại thiết bị, hệ điều hành, phiên bản ứng dụng, và các nhận dạng duy nhất của thiết bị.</Text>
          <Text style={styles.listItem}>-  Thông tin vị trí: Dữ liệu vị trí của bạn khi bạn sử dụng tính năng tìm kiếm trạm sạc gần nhất.</Text>
          <Text style={styles.listItem}>-  Thông tin sử dụng: Lịch sử sạc, tần suất sử dụng, và các tương tác với Ứng Dụng.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>3. Cách chúng tôi sử dụng thông tin</Text>
          <Text style={styles.text}>
            Chúng tôi sử dụng thông tin của bạn để:
          </Text>
          <Text style={styles.listItem}>-  Cung cấp và duy trì các dịch vụ của Ứng Dụng.</Text>
          <Text style={styles.listItem}>-  Xử lý các giao dịch và thanh toán.</Text>
          <Text style={styles.listItem}>-  Cải thiện và cá nhân hóa trải nghiệm người dùng.</Text>
          <Text style={styles.listItem}>-  Gửi thông báo và cập nhật liên quan đến dịch vụ.</Text>
          <Text style={styles.listItem}>-  Đảm bảo an ninh và ngăn chặn gian lận.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>4. Chia sẻ thông tin của bạn</Text>
          <Text style={styles.text}>
            Chúng tôi sẽ không bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba ngoại trừ trong các trường hợp sau:
          </Text>
          <Text style={styles.listItem}>-  Nhà cung cấp dịch vụ: Chúng tôi có thể chia sẻ thông tin với các nhà cung cấp dịch vụ của chúng tôi để hỗ trợ trong việc cung cấp dịch vụ.</Text>
          <Text style={styles.listItem}>-  Yêu cầu pháp lý: Chúng tôi có thể tiết lộ thông tin của bạn nếu được yêu cầu bởi luật pháp hoặc cơ quan chính phủ.</Text>
          <Text style={styles.listItem}>-  Bảo vệ quyền lợi: Chúng tôi có thể chia sẻ thông tin để bảo vệ quyền lợi, tài sản, hoặc an toàn của Ứng Dụng, người dùng, hoặc công chúng.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>5. Bảo mật thông tin</Text>
          <Text style={styles.text}>
            Chúng tôi áp dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin cá nhân của bạn khỏi mất mát, trộm cắp, truy cập trái phép, và tiết lộ.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>6. Quyền của bạn</Text>
          <Text style={styles.text}>
            Bạn có quyền truy cập, sửa đổi, hoặc xóa thông tin cá nhân của mình. Nếu bạn muốn thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua thông tin liên lạc dưới đây.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>7. Thay đổi chính sách bảo mật</Text>
          <Text style={styles.text}>
            Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Bất kỳ thay đổi nào sẽ được thông báo qua Ứng Dụng hoặc qua email.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>8. Liên hệ</Text>
          <Text style={styles.text}>
            Nếu bạn có bất kỳ câu hỏi hoặc quan ngại nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi:
          </Text>
          <Text style={styles.text}>
            - Email: linhngan220902@gmail.com{'\n'}
            - Điện thoại: (+84) 886561303
          </Text>
          <TouchableOpacity onPress={handleOpenLink}>
            <Text style={styles.link}>Xem thêm tại: https://ev-charging-station-admin.vercel.app/privacy-policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10,
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
