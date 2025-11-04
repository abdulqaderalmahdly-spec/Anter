// Anter/src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { getCurrentUser, followUser, unfollowUser, blockUser, unblockUser } from '../services/auth';
import { db } from '../services/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Avatar from '../components/Avatar';
import { COLORS } from '../constants/colors';

const ProfileScreen = ({ route, navigation }) => {
  const targetUserId = route.params?.userId || getCurrentUser()?.uid;
  const [profileData, setProfileData] = useState(null);
  const currentUser = getCurrentUser();
  const isMyProfile = currentUser?.uid === targetUserId;

  useEffect(() => {
    if (!targetUserId) return;

    const userRef = doc(db, 'users', targetUserId);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfileData({ id: docSnap.id, ...docSnap.data() });
      } else {
        Alert.alert('خطأ', 'لم يتم العثور على الملف الشخصي.');
        setProfileData(null);
      }
    });

    return () => unsubscribe();
  }, [targetUserId]);

  const isFollowing = profileData?.followers?.includes(currentUser?.uid);
  const isBlocked = profileData?.blockedUsers?.includes(currentUser?.uid);

  const handleFollowToggle = async () => {
    if (!currentUser || !profileData) return;
    try {
      if (isFollowing) {
        await unfollowUser(currentUser.uid, targetUserId);
      } else {
        await followUser(currentUser.uid, targetUserId);
      }
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحديث حالة المتابعة.');
      console.error(error);
    }
  };

  const handleBlockToggle = async () => {
    if (!currentUser || !profileData) return;
    try {
      if (isBlocked) {
        await unblockUser(currentUser.uid, targetUserId);
        Alert.alert('نجاح', 'تم إلغاء حظر المستخدم.');
      } else {
        await blockUser(currentUser.uid, targetUserId);
        Alert.alert('نجاح', 'تم حظر المستخدم.');
      }
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحديث حالة الحظر.');
      console.error(error);
    }
  };

  if (!profileData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>جاري تحميل الملف الشخصي...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar uri={profileData.photoURL} size={100} />
        <Text style={styles.displayName}>{profileData.displayName || 'مستخدم أنتر'}</Text>
        <Text style={styles.bio}>{profileData.bio || 'لم يضف سيرة ذاتية بعد.'}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profileData.following?.length || 0}</Text>
          <Text style={styles.statLabel}>متابَع</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profileData.followers?.length || 0}</Text>
          <Text style={styles.statLabel}>متابِع</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        {isMyProfile ? (
          <Button title="تعديل الملف الشخصي" onPress={() => navigation.navigate('EditProfile')} color={COLORS.primary} />
        ) : (
          <>
            <Button 
              title={isFollowing ? 'إلغاء المتابعة' : 'متابعة'} 
              onPress={handleFollowToggle} 
              color={isFollowing ? COLORS.secondary : COLORS.primary} 
            />
            <Button 
              title={isBlocked ? 'إلغاء الحظر' : 'حظر المستخدم'} 
              onPress={handleBlockToggle} 
              color={COLORS.danger} 
            />
          </>
        )}
      </View>

      <Text style={styles.sectionTitle}>منشورات المستخدم</Text>
      {/* هنا سيتم عرض قائمة بمنشورات المستخدم */}
      <Text style={styles.text}>قائمة المنشورات ستظهر هنا...</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.text,
  },
  bio: {
    fontSize: 16,
    color: COLORS.lightText,
    marginTop: 5,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  actionsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    color: COLORS.text,
  },
  text: {
    textAlign: 'right',
    paddingHorizontal: 15,
  }
});

export default ProfileScreen;
