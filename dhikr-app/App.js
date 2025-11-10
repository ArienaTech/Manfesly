import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  I18nManager,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import RNPickerSelect from 'react-native-picker-select';

// تفعيل الكتابة من اليمين لليسار (RTL)
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// قائمة الأذكار المتاحة
const ADHKAR = [
  { label: 'سبحان الله', value: 'subhanallah' },
  { label: 'الحمد لله', value: 'alhamdulillah' },
  { label: 'الله أكبر', value: 'allahuakbar' },
  { label: 'لا إله إلا الله', value: 'lailahaillallah' },
  { label: 'أستغفر الله', value: 'astaghfirullah' },
  { label: 'لا حول ولا قوة إلا بالله', value: 'lahawla' },
];

// مفاتيح التخزين المحلي
const STORAGE_KEYS = {
  CURRENT_COUNT: '@current_count',
  CURRENT_DHIKR: '@current_dhikr',
  TOTALS: '@dhikr_totals',
};

export default function App() {
  // حالة العداد الحالي
  const [currentCount, setCurrentCount] = useState(0);
  
  // حالة الذكر المختار
  const [selectedDhikr, setSelectedDhikr] = useState('subhanallah');
  
  // حالة إجمالي العدد لكل ذكر
  const [totals, setTotals] = useState({
    subhanallah: 0,
    alhamdulillah: 0,
    allahuakbar: 0,
    lailahaillallah: 0,
    astaghfirullah: 0,
    lahawla: 0,
  });

  // تحميل البيانات المحفوظة عند بدء التطبيق
  useEffect(() => {
    loadData();
  }, []);

  // حفظ البيانات عند تغيير العداد أو الذكر المختار
  useEffect(() => {
    saveData();
  }, [currentCount, selectedDhikr, totals]);

  // دالة تحميل البيانات من التخزين المحلي
  const loadData = async () => {
    try {
      const savedCount = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_COUNT);
      const savedDhikr = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_DHIKR);
      const savedTotals = await AsyncStorage.getItem(STORAGE_KEYS.TOTALS);

      if (savedCount !== null) setCurrentCount(parseInt(savedCount));
      if (savedDhikr !== null) setSelectedDhikr(savedDhikr);
      if (savedTotals !== null) setTotals(JSON.parse(savedTotals));
    } catch (error) {
      console.error('خطأ في تحميل البيانات:', error);
    }
  };

  // دالة حفظ البيانات في التخزين المحلي
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_COUNT, currentCount.toString());
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_DHIKR, selectedDhikr);
      await AsyncStorage.setItem(STORAGE_KEYS.TOTALS, JSON.stringify(totals));
    } catch (error) {
      console.error('خطأ في حفظ البيانات:', error);
    }
  };

  // دالة زيادة العداد
  const incrementCount = () => {
    const newCount = currentCount + 1;
    setCurrentCount(newCount);
    
    // تحديث الإجمالي للذكر المختار
    setTotals(prevTotals => ({
      ...prevTotals,
      [selectedDhikr]: prevTotals[selectedDhikr] + 1,
    }));
  };

  // دالة إعادة تعيين العداد الحالي
  const resetCurrentCounter = () => {
    Alert.alert(
      'إعادة تعيين العداد',
      'هل تريد إعادة تعيين العداد الحالي؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'نعم',
          onPress: () => setCurrentCount(0),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // دالة مسح جميع البيانات المحفوظة
  const clearAllData = () => {
    Alert.alert(
      'مسح البيانات',
      'هل تريد مسح جميع البيانات المحفوظة؟ لا يمكن التراجع عن هذا الإجراء.',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'مسح الكل',
          onPress: () => {
            setCurrentCount(0);
            setTotals({
              subhanallah: 0,
              alhamdulillah: 0,
              allahuakbar: 0,
              lailahaillallah: 0,
              astaghfirullah: 0,
              lahawla: 0,
            });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // دالة الحصول على اسم الذكر من القيمة
  const getDhikrLabel = (value) => {
    const dhikr = ADHKAR.find(item => item.value === value);
    return dhikr ? dhikr.label : '';
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* الرأس */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>عداد الأذكار والتسبيح</Text>
        <Text style={styles.headerSubtitle}>إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* قسم اختيار الذكر */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>اختر الذكر:</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              value={selectedDhikr}
              onValueChange={(value) => setSelectedDhikr(value)}
              items={ADHKAR}
              style={pickerStyles}
              placeholder={{}}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        </View>

        {/* عرض الذكر المختار */}
        <View style={styles.dhikrDisplay}>
          <Text style={styles.dhikrText}>{getDhikrLabel(selectedDhikr)}</Text>
        </View>

        {/* العداد الرئيسي */}
        <View style={styles.counterSection}>
          <Text style={styles.counterLabel}>العدد الحالي:</Text>
          <Text style={styles.counterText}>{currentCount}</Text>
        </View>

        {/* زر الزيادة الكبير */}
        <TouchableOpacity
          style={styles.incrementButton}
          onPress={incrementCount}
          activeOpacity={0.7}
        >
          <Text style={styles.incrementButtonText}>+</Text>
        </TouchableOpacity>

        {/* أزرار التحكم */}
        <View style={styles.controlButtons}>
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetCurrentCounter}
          >
            <Text style={styles.buttonText}>إعادة تعيين العداد</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={clearAllData}
          >
            <Text style={styles.buttonText}>مسح جميع البيانات</Text>
          </TouchableOpacity>
        </View>

        {/* قسم الإحصائيات */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>إجمالي الأذكار المحفوظة:</Text>
          {ADHKAR.map((dhikr) => (
            <View key={dhikr.value} style={styles.statRow}>
              <Text style={styles.statLabel}>{dhikr.label}:</Text>
              <Text style={styles.statValue}>{totals[dhikr.value]}</Text>
            </View>
          ))}
          
          {/* إجمالي عام */}
          <View style={[styles.statRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>الإجمالي الكلي:</Text>
            <Text style={styles.totalValue}>
              {Object.values(totals).reduce((sum, val) => sum + val, 0)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// أنماط التطبيق
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1b2a',
  },
  header: {
    backgroundColor: '#1b263b',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#415a77',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e0e1dd',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#778da9',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e1dd',
    marginBottom: 10,
    textAlign: 'right',
  },
  pickerContainer: {
    backgroundColor: '#1b263b',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#415a77',
    overflow: 'hidden',
  },
  dhikrDisplay: {
    backgroundColor: '#1b263b',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#415a77',
    alignItems: 'center',
  },
  dhikrText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  counterSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  counterLabel: {
    fontSize: 18,
    color: '#778da9',
    marginBottom: 10,
  },
  counterText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#e0e1dd',
  },
  incrementButton: {
    backgroundColor: '#4CAF50',
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  incrementButtonText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  controlButtons: {
    marginBottom: 30,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#FF9800',
  },
  clearButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsSection: {
    backgroundColor: '#1b263b',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#415a77',
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e0e1dd',
    marginBottom: 15,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#415a77',
  },
  statLabel: {
    fontSize: 16,
    color: '#778da9',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  totalRow: {
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#415a77',
    borderBottomWidth: 0,
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e1dd',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

// أنماط القائمة المنسدلة
const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#e0e1dd',
    textAlign: 'right',
  },
  inputAndroid: {
    fontSize: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#e0e1dd',
    textAlign: 'right',
  },
  inputWeb: {
    fontSize: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#e0e1dd',
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
});
